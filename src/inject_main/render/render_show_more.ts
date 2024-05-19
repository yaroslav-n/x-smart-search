export const renderShowMore = (onClick: () => void): HTMLDivElement => {
    const showMoreElem = document.createElement('div');
    showMoreElem.setAttribute('id', 'smart_search_grok_show_more_container');

    const link = document.createElement('a');
    link.innerText = 'Show more';
    link.onclick = (e) => {
        e.preventDefault();
        onClick();
        showMoreElem.style.display = 'none';
    };

    showMoreElem.append(link);

    return showMoreElem;
};