import { focusEventListener } from "./core/focus_event_listener";
import { injectCSS } from "./core/inject_css";
import { inputEventListener } from "./core/input_event_listener";
import { suggestionsManager } from "./core/suggestions_manager";
import { createObserver } from "./util/create_observer"

document.addEventListener('DOMContentLoaded', () => {
    injectCSS();
})

const inputObserver = createObserver("input[data-testid='SearchBox_Search_Input']", (el) => {
    const input = el as HTMLInputElement;

    input.addEventListener('focus', focusEventListener);
    input.addEventListener('input', inputEventListener);
}, () => {});

inputObserver.observe(document, { subtree: true, childList: true });

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "suggestion") {
        suggestionsManager.updateSuggestion(message.input_id, message.suggestion);
    } else if (message.type === "error") {
        suggestionsManager.setError(message.input_id, message.error);
    }
});