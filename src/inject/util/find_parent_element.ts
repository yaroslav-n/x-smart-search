export const findParentElement = (el: HTMLElement, selector: string): Element | undefined => {
    let parentEl: Element | null = el;

    while ((parentEl = parentEl.parentElement)) {
        if (parentEl.matches(selector)) {
            break;
        }
    }

    return parentEl ?? undefined;
}