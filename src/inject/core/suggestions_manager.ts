import { debounce } from "../../generic/debounce";
import { INPUT_ID_ATTRIBUTE } from "./focus_event_listener";
import { getContainer } from "./get_container";
import { hideSuggestion } from "./hide_suggestion";
import { renderSuggestion } from "./render_suggestion";

class SuggestionsManager {
    private _requestSuggestion: (inputId: string, text: string) => void = () => {}

    constructor() {
        this._requestSuggestion = debounce((inputId: string, text: string) => {
            chrome.runtime.sendMessage({
                type: "request_suggestion",
                input_id: inputId,
                text: text
            });
        }, 500);
    }

    onInputUpdated(inputEl: HTMLInputElement) {
        const inputText = inputEl.value;
        const inputId = inputEl.getAttribute(INPUT_ID_ATTRIBUTE);
        

        if (inputText && inputId) {
            this._requestSuggestion(inputId, inputText)
        }
    }

    updateSuggestion(input_id: string, suggestion: string) {
        const inputEl = document.querySelector(`input[${INPUT_ID_ATTRIBUTE}="${input_id}"]`) as HTMLInputElement | null;

        if (!inputEl) {
            return
        }

        const container = getContainer(inputEl);
        if (!container) {
            return;
        }

        const inputText = inputEl.value;
        
        if (!inputText.startsWith(suggestion)) {
            renderSuggestion(container, suggestion);
        } else {
            hideSuggestion(container);
        }
    }
}


export const suggestionsManager = new SuggestionsManager();