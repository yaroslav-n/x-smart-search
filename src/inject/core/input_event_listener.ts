import { suggestionsManager } from "./suggestions_manager";

export const inputEventListener = (e: Event) => {
    const inputEl = e.currentTarget as HTMLInputElement;
    suggestionsManager.onInputUpdated(inputEl);
}