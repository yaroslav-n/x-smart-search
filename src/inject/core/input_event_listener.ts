import { getContainer } from "./get_container";
import { renderSuggestion } from "./render_suggestion";

export const inputEventListener = (e: Event) => {
    const inputEl = e.currentTarget as HTMLInputElement;
    const text = inputEl.value ?? "";
    const container = getContainer(inputEl);

    if (!container) {
        return;
    }

    renderSuggestion(container, text);
}