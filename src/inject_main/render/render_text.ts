export const renderText = (text: string) => {
    const textElem = document.createElement('div');
    textElem.setAttribute('id', 'smart_search_grok_text_container');
    textElem.innerText = text;

    return textElem;
}