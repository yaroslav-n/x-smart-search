const searchIconUrl = chrome.runtime.getURL('assets/icons/search_icon.svg');

export const hideSuggestion = (container: HTMLDivElement) => {
    container.style.display = 'none';
}