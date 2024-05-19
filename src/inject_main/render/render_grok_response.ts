import { injectCSS } from "./inject_css";
import { renderShowMore } from "./render_show_more";
import { renderText } from "./render_text";
import { renderTitle } from "./render_title";

type Input = {
    text: string;
    isLoading: boolean;
}

export const renderGrokResponse = async ({ text, isLoading } : Input) => {
    const primaryColumn = document.querySelector('div[data-testid="primaryColumn"]');
    const insertionPoint = primaryColumn?.children[0].children[1] as HTMLDivElement | null;

    if (!primaryColumn || !insertionPoint) {
        return;
    }
    
    let textContainer: HTMLDivElement | undefined;

    // container already exists
    let container = primaryColumn.querySelector('div[id="smart_search_grok_container"]');
    if (container) {
        container.setAttribute('data-loading', isLoading.toString());
        textContainer = container.querySelector('div[id="smart_search_grok_text_container"]') as HTMLDivElement;
        textContainer.innerText = text;
    } else {
        injectCSS();

        container = document.createElement('div');
        container.id = 'smart_search_grok_container';
        container.setAttribute('data-loading', isLoading.toString());
        container.prepend(renderTitle());
        textContainer = renderText(text);
        container.append(textContainer);
        container.append(renderShowMore(() => {
            textContainer!.setAttribute('data-opened', 'true');
        }));

        insertionPoint.after(container)
    }


    // do we need to display "Show more" button?
    const showMoreButton = container.querySelector('div[id="smart_search_grok_show_more_container"]') as HTMLDivElement;

    if (showMoreButton && textContainer && textContainer.scrollHeight > textContainer.clientHeight) {
        const showMoreButton = container.querySelector('div[id="smart_search_grok_show_more_container"]') as HTMLDivElement;
        showMoreButton.style.display = 'block';
    } else if (showMoreButton) {
        showMoreButton.style.display = 'none';
    }
}