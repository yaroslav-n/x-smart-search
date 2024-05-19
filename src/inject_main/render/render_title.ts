export const renderTitle = () => {
    const titleElem = document.createElement('div');
    titleElem.setAttribute('id', 'smart_search_grok_title_container');
    
    titleElem.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="16" rx="3" fill="black"/>
            <path d="M10 3.5H12L6 12.5H4L10 3.5Z" fill="white"/>
        </svg>
        <span class="smart_search_grok_title">Grok Summary</span>
    `

    return titleElem;
}