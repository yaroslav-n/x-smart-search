import { createObserver } from "../util/create_observer";
import { findParentElement } from "../util/find_parent_element";
import { suggestionsManager } from "./suggestions_manager";

export const INPUT_ID_ATTRIBUTE = 'data-chrome-extension-safe-search-input-id';

export const focusEventListener = (e: FocusEvent) => {
    const inputEl = e.currentTarget as HTMLInputElement;
    
    if (!inputEl.hasAttribute(INPUT_ID_ATTRIBUTE)) {
        inputEl.setAttribute(INPUT_ID_ATTRIBUTE, 'input_' + Math.random().toString(36).substring(2));
    }

    const form = findParentElement(inputEl, 'form')

    if (!form) {
        return;
    }

    const formObserver = createObserver('div[role="progressbar"]', (el) => {
        suggestionsManager.onInputUpdated(inputEl);
    }, () => {})

    formObserver.observe(form, { subtree: true, childList: true });

    // on Ctrl + Enter, search for the suggestion
    const onCtrlEnter = (e: KeyboardEvent) => {
        if(e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            const id = inputEl?.getAttribute(INPUT_ID_ATTRIBUTE);

            if (id) {
                suggestionsManager.searchByInputId(id);
            }
        }
    }
    document.body.addEventListener('keydown', onCtrlEnter);

    // cleaning up
    const onBlur = () => {
        formObserver.disconnect();
        inputEl.removeEventListener('blur', onBlur);
        document.body.removeEventListener('keydown', onCtrlEnter);
    }

    inputEl.addEventListener('blur', onBlur);
}