import { suggestionsManager } from "./suggestions_manager";

const searchIconUrl = chrome.runtime.getURL('assets/icons/search_icon.svg');

export const LABEL_ID = 'extensionSmartSearchLabel';
const hotkey = navigator.userAgent.indexOf('Mac OS X') != -1 ? '⌘ + ⏎' : 'Ctrl + ⏎';

export const renderSuggestion = (container: HTMLDivElement, text: string) => {
    container.style.display = 'block';
    const label = container.querySelector(`#${LABEL_ID}`) as HTMLSpanElement | null;

    if (label) {
        label.innerText = text;
    } else {
        container.innerHTML = `
            <div class="extensionSmartSearchMenuItem">
                <img src="${searchIconUrl}" class="extensionSmartSearchIcon" alt="smart search icon" />
                <div class="extensionSmartSearchMenuItemLabel">
                    <div id="${LABEL_ID}">${text}</div>
                    <div class="extensionSmartSearchMenuItemHint">${hotkey}</div>
                </div>
            </div>
        `;
    }

    container.onclick = () => {
        suggestionsManager.searchText(text);
    }
}