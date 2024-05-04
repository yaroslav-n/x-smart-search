// This function goes up the DOM tree to find the first parent element that matches the given selector.
export const findParentElement = (el: HTMLElement, selector: string): Element | undefined => {
    let parentEl: Element | null = el;

    while (parentEl = parentEl.parentElement) {
        if (!parentEl || parentEl.matches(selector)) {
            break;
        }
    }

    return parentEl ?? undefined;
}