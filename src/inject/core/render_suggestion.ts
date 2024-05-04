const searchIconUrl = chrome.runtime.getURL('assets/icons/search_icon.svg');

const LABEL_ID = 'extensionSmartSearchLabel';

export const renderSuggestion = (container: HTMLDivElement, text: string) => {
    container.style.display = 'block';
    const label = container.querySelector(`#${LABEL_ID}`) as HTMLSpanElement | null;

    if (label) {
        label.innerText = text;
        return;
    } else {
        container.innerHTML = `
            <div class="extensionSmartSearchMenuItem">
                <img src="${searchIconUrl}" class="extensionSmartSearchIcon" alt="smart search icon" />
                <div class="extensionSmartSearchMenuItemLabel">
                    <div id="${LABEL_ID}">${text}</div>
                    <div class="extensionSmartSearchMenuItemHint">Ctrl + ⏎</div>
                </div>
            </div>
        `;
    }
}