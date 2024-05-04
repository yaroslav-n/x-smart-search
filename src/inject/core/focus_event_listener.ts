import { createObserver } from "../util/create_observer";
import { findParentElement } from "../util/find_parent_element";
import { getContainer } from "./get_container";
import { suggestions } from "./suggestions";

export const focusEventListener = (e: FocusEvent) => {
    const inputEl = e.currentTarget as HTMLInputElement;
    const form = findParentElement(inputEl, 'form')

    if (!form) {
        return;
    }

    const formObserver = createObserver('div[role="progressbar"]', (el) => {
        const container = getContainer(inputEl);

        if (container) {
            suggestions.onContainerAdded(container);
        }
    }, () => {})

    formObserver.observe(form, { subtree: true, childList: true });

    // cleaning up
    const onBlur = (e: FocusEvent) => {
        formObserver.disconnect();
        inputEl.removeEventListener('blur', onBlur);
    }

    inputEl.addEventListener('blur', onBlur);
}