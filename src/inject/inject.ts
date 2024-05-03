import { createObserver } from "./util/create_observer"
import { findParentElement } from "./util/find_parent_element";

const inputObserver = createObserver("input[data-testid='SearchBox_Search_Input']", (el) => {
    const input = el as HTMLInputElement;

    input.addEventListener('input', (e) => {
        const text = input.value;
        const parent = findParentElement(input, 'form')
        console.log('>>> lol',)
    });

    input.style.backgroundColor = "red";
}, (el) => {});

inputObserver.observe(document, { subtree: true, childList: true });