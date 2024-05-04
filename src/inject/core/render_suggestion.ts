const searchIconUrl = chrome.runtime.getURL('assets/icons/search_icon.svg');

const LABEL_ID = 'extensionSmartSearchLabel';

export const renderSuggestion = (container: HTMLDivElement, text: string) => {
    const label = container.querySelector(`#${LABEL_ID}`) as HTMLSpanElement | null;

    if (label) {
        label.innerText = text;
        return;
    } else {
        container.innerHTML = `
            <div style="width:100%;max-width:100%;box-sizing:border-box;padding:14px 16px 16px 16px;line-height:20px;display:flex;flex-direction:row;align-items:flex-start;
                        font-family: 'TwitterChirp', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                        font-size:15px;border-bottom:1px solid rgb(239, 243, 244);position:relative;">
                <img src="${searchIconUrl}" style="position:relative;top:2px;width:16px;height:16px;" alt="smart search icon" />
                <div style="width:10px"></div>
                <div style="flex-grow:1;overflow-wrap:break-word;overflow-x:auto;overflow-y:hidden">
                    <div id="${LABEL_ID}">${text}</div>
                    <div style="line-height:11px;margin-top:4px;color:gray;font-size:11px;">Ctrl + ⏎</div>
                </div>
            </div>
        `;
    }
}