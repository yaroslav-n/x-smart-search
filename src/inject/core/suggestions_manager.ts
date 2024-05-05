import { debounce } from "../../generic/debounce";
import { INPUT_ID_ATTRIBUTE } from "./focus_event_listener";
import { getContainer } from "./get_container";
import { hideSuggestion } from "./hide_suggestion";
import { LINK_CLASS, renderSuggestion } from "./render_suggestion";

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
        if (inputText && inputId && inputText.length > 5) {
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
        
        if (!inputText.toLowerCase().startsWith(suggestion.toLowerCase())) {
            renderSuggestion(container, suggestion);
        } else {
            hideSuggestion(container);
        }
    }

    setError(inputId: string, error: string) {
        const inputEl = document.querySelector(`input[${INPUT_ID_ATTRIBUTE}="${inputId}"]`) as HTMLInputElement | null;

        if (!inputEl) {
            return
        }

        const container = getContainer(inputEl);
        if (!container) {
            return;
        }

        renderSuggestion(container, error, chrome.runtime.getURL('assets/settings.html'));
    }

    searchByInputId(inputId: string) {
        const inputEl = document.querySelector(`input[${INPUT_ID_ATTRIBUTE}="${inputId}"]`) as HTMLInputElement | null;

        if (!inputEl) {
            return
        }

        const container = getContainer(inputEl);
        const linkEl = container?.querySelector(`.${LINK_CLASS}`) as HTMLLinkElement | null;

        if (linkEl) {
            linkEl.click();
        }
    }

}


export const suggestionsManager = new SuggestionsManager();