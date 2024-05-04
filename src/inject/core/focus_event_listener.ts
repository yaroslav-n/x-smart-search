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

    // cleaning up
    const onBlur = (e: FocusEvent) => {
        formObserver.disconnect();
        inputEl.removeEventListener('blur', onBlur);
    }

    inputEl.addEventListener('blur', onBlur);
}