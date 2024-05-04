import { focusEventListener } from "./core/focus_event_listener";
import { inputEventListener } from "./core/input_event_listener";
import { createObserver } from "./util/create_observer"

const inputObserver = createObserver("input[data-testid='SearchBox_Search_Input']", (el) => {
    const input = el as HTMLInputElement;

    input.addEventListener('focus', focusEventListener);
    input.addEventListener('input', inputEventListener);

    input.style.backgroundColor = "red";
}, (el) => {});

inputObserver.observe(document, { subtree: true, childList: true });