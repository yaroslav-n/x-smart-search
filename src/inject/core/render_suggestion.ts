import { isDarkColor } from "../util/is_dark_color";

const searchIconUrlBlack = chrome.runtime.getURL('assets/icons/search_icon_black.svg');
const searchIconUrlWhite = chrome.runtime.getURL('assets/icons/search_icon_white.svg');

export const LABEL_ID = 'extensionSmartSearchLabel';
export const LINK_CLASS = 'extensionSmartSearchMenuItem';

const hotkey = navigator.userAgent.indexOf('Mac OS X') != -1 ? '⌘ + ⏎' : 'Ctrl + ⏎';

export const renderSuggestion = (container: HTMLDivElement, text: string, linkUrl?: string) => {
    container.style.display = 'block';
    const labelContainer = container.querySelector(`#${LABEL_ID}`) as HTMLSpanElement | null;
    const { text: labelText, html } = renderLabel(text);
    
    const url = linkUrl ?? `https://twitter.com/search?q=${encodeURIComponent(labelText)}&src=smart_search_extension&f=top`;

    if (labelContainer) {
        const link = container.querySelector(`.${LINK_CLASS}`) as HTMLAnchorElement;
        link.setAttribute('href', url);
        labelContainer.innerHTML = html;
    } else {
        const backgroundColor = document.body.style.backgroundColor;
        const isDarkMode = isDarkColor(backgroundColor);
        const searchIconUrl = isDarkMode ? searchIconUrlWhite : searchIconUrlBlack;

        container.innerHTML = `
            <a class="${LINK_CLASS}" href="${url}">
                <img src="${searchIconUrl}" class="extensionSmartSearchIcon" alt="smart search icon" />
                <div class="extensionSmartSearchMenuItemLabel">
                    <div id="${LABEL_ID}">${html}</div>
                    <div class="extensionSmartSearchMenuItemHint">${hotkey}</div>
                </div>
            </a>
        `;
    }
}

const renderLabel = (text: string) => {
    const tagRegex = /[^\s.,\/!\^&\*;:{}=\`~()]+:[^\s.,\/!\^&\*;:{}=\`~()]+/gi;

    const tags = [...text.matchAll(tagRegex)].map(match => match[0]).sort()
    const newText = text.replaceAll(tagRegex, '').trim();
    
    const tagsElemenst = tags.map((tag) => {
        const [key, value] = tag.split(':');
        return `${key}:<span class="extensionSmartSearchTagValue">${value}</span>`;
    })

    return {
        text: [newText, ...tags].join(' '),
        html: `${!!newText ? `<span>${newText}</span>` : ''}${tagsElemenst.map(tag => `<span class="extensionSmartSearchTag">${tag}</span>`).join('')}`
    };
}