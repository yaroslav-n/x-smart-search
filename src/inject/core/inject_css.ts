export const injetCSS = () => {
    const styles = document.createElement('style');
    styles.innerHTML = `
        .extensionSmartSearchMenuItem {
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            padding: 14px 16px 16px 16px;
            line-height: 20px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            font-family: 'TwitterChirp', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            font-size: 15px;
            border-bottom: 1px solid rgb(239, 243, 244);
            position: relative;
            cursor: pointer;
        }
        .extensionSmartSearchMenuItem:hover {
            background-color: rgb(247, 249, 249);
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
    `

    document.head.appendChild(styles);
}