import { findParentElement } from "../util/find_parent_element"

const INJECT_CONTAINER_ID = 'extensionSmartSearchContainer';

export const getContainer = (inputEl: HTMLInputElement): HTMLDivElement | undefined => {
    const parent = findParentElement(inputEl, 'form')

    if (!parent) {
        return undefined;
    }

    let container = parent.querySelector('#' + INJECT_CONTAINER_ID) as HTMLDivElement | null;

    if (!container) {
        container = document.createElement('div');
        container.id = INJECT_CONTAINER_ID;
    }

    const injectPoint = parent.querySelector('div[role="progressbar"]');
    if (!injectPoint) {
        return;
    }

    injectPoint.after(container);
    return container ?? undefined;
}