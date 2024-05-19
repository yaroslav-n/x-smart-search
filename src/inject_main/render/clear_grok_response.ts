export const clearGrokResponse = () => {
    const container = document.getElementById('smart_search_grok_container');
    if (container) {
        container.remove();
    }
}