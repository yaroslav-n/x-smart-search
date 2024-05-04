import { debounce } from "../../generic/debounce";
import { INPUT_ID_ATTRIBUTE } from "./focus_event_listener";
import { getContainer } from "./get_container";
import { hideSuggestion } from "./hide_suggestion";
import { LABEL_ID, renderSuggestion } from "./render_suggestion";

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

    updateSuggestion(inputId: string, suggestion: string) {
        const inputEl = document.querySelector(`input[${INPUT_ID_ATTRIBUTE}="${inputId}"]`) as HTMLInputElement | null;

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

    searchByInputId(inputId: string) {
        const inputEl = document.querySelector(`input[${INPUT_ID_ATTRIBUTE}="${inputId}"]`) as HTMLInputElement | null;

        if (!inputEl) {
            return
        }

        const container = getContainer(inputEl);
        const text = container?.querySelector(`#${LABEL_ID}`)?.textContent;

        if (text) {
            window.location.href = `https://twitter.com/search?q=${encodeURIComponent(text)}&src=smart_search_extension&f=top`;
        }
    }

    searchText(text: string) {
        window.location.href = `https://twitter.com/search?q=${encodeURIComponent(text)}&src=smart_search_extension&f=top`;
    }
}


export const suggestionsManager = new SuggestionsManager();