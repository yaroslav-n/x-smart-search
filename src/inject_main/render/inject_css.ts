import { isDarkMode as isXDarkMode } from "../../inject/core/is_dark_mode";

const showMoreButtonHeight = '40px';
const textLinesDefault = 5;

export const injectCSS = () => {
    const backgroundColor = document.body.style.backgroundColor;
    const isDarkMode = isXDarkMode();
    let styles = document.getElementById('extensionSmartSearchGrokStyle')
    
    if (!styles) {
        styles = document.createElement('style');
        styles.id = 'extensionSmartSearchGrokStyle';
        document.head.appendChild(styles);
    }

    styles.innerHTML = `
        #smart_search_grok_container {
            color-scheme: light only;
            width: 100%;
            max-width: 100%;
            color: inherit;
            box-sizing: border-box;
            padding: 14px 16px 16px 16px;
            line-height: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            font-family: 'TwitterChirp', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            font-size: 14px;
            border-bottom: 1px solid rgba(150, 150, 150, 0.1);
            margin-bottom: 10px;
            row-gap: 10px;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
        }

        #smart_search_grok_title_container {
            display: flex;
            flex-direction: row;
            align-items: center;
            column-gap: 5px;
            font-weight: 500;
        }

        @keyframes loading {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }

        #smart_search_grok_text_container {
            overflow-wrap: anywhere;
            overflow: hidden;
            margin-bottom: calc(${showMoreButtonHeight} - 16px);

            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: ${textLinesDefault};
            line-height: 1.5em;
            height: calc(${textLinesDefault} * 1.5em);
        }

        #smart_search_grok_text_container[data-opened="true"] {
            -webkit-line-clamp: unset;
            height: auto;
            margin-bottom: 0;
        }

        #smart_search_grok_container[data-loading="true"]  #smart_search_grok_text_container::after {
            content: '|';
            opacity: 1;
            animation: loading 1s infinite;
        }

        #smart_search_grok_show_more_container {
            position: absolute;
            bottom: 0;
            left: 0;
            width:100%;
            height: ${showMoreButtonHeight};
            padding: 2px 16px 0 16px;
            box-sizing: border-box;
            background-color: ${backgroundColor};
            color: ${isDarkMode ? 'rgba(255,255,255,0.8)' : 'rgb(29, 155, 240)'};
            font-size: 15px;
        }

        #smart_search_grok_show_more_container a {
            cursor: pointer;
            margin-top: 8px;
            text-decoration: none;
        }

        #smart_search_grok_show_more_container a:hover {
            text-decoration: underline;
        }
    `
}