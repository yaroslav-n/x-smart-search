type ElementObserver = (
    selector: string,
    onElementAdded: (el: Element) => void,
    onElementRemoved: (el: Element) => void
) => MutationObserver;

// This function creates a MutationObserver that watches for elements being added or removed from the DOM.
export const createObserver: ElementObserver = (selector, onElementAdded, onElementRemoved) => {
    return new MutationObserver((mutations_list) => {
        mutations_list.forEach((mutation) => {
            const addedNodes = mutation.addedNodes as unknown as HTMLElement[];
            addedNodes.forEach((added_node) => {
                const elements = added_node.querySelectorAll?.(selector) ?? [];

                for (const el of elements) {
                    onElementAdded(el);
                }
            });

            const removedNodes = mutation.removedNodes as unknown as HTMLElement[];
            removedNodes.forEach((removed_node) => {
                const elements = removed_node.querySelectorAll?.(selector) ?? [];

                for (const el of elements) {
                    onElementRemoved(el);
                }
            });
        });
    });
};
