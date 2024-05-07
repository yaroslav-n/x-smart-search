import { isDarkMode as isXDarkMode } from "./is_dark_mode";
import { LABEL_ID, LINK_CLASS } from "./render_suggestion";

export const injectCSS = () => {
    const isDarkMode = isXDarkMode();

    let styles = document.getElementById('extensionSmartSearchStyle')
    
    if (!styles) {
        styles = document.createElement('style');
        styles.id = 'extensionSmartSearchStyle';
        document.head.appendChild(styles);
    }

    styles.innerHTML = `
        .${LINK_CLASS} {
            color-scheme: light only;
            width: 100%;
            text-decoration: none;
            max-width: 100%;
            color: inherit;
            box-sizing: border-box;
            padding: 14px 16px 16px 16px;
            line-height: 20px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            font-family: 'TwitterChirp', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            font-size: 15px;
            border-bottom: 1px solid rgba(150, 150, 150, 0.05);
            position: relative;
            cursor: pointer;
        }
        .${LINK_CLASS}:hover {
            background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgb(247, 249, 249)'};
        }
        .extensionSmartSearchIcon {
            position: relative;
            top: 2px;
            width: 16px;
            height: 16px;
        }
        .extensionSmartSearchMenuItemLabel {
            margin-left: 10px;
            flex-grow: 1;
            overflow-wrap: break-word;
            overflow-x: auto;
            overflow-y: hidden;
        }
        .extensionSmartSearchMenuItemHint {
            line-height: 11px;
            margin-top: 4px;
            color: gray;
            font-size: 11px;
        }

        #${LABEL_ID} {
            display: flex;
            flex-wrap: wrap;
            row-gap: 3px;
            column-gap: 4px;
        }
    
        .extensionSmartSearchTag {
            background-color: ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
            color: ${isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'};
            font-size: 12px;
            padding: 0 6px;
            border-radius: 4px;
        }

        .extensionSmartSearchTagValue {
            color: ${isDarkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'};
        }
    `
}