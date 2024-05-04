class Suggestions {
    onContainerAdded(container: HTMLDivElement) {
        const dataId = `container_${Math.random().toString(36).substring(2)}`
        container.setAttribute('data-id', dataId);
        container.innerHTML = 'suggestions';
    }
}


export const suggestions = new Suggestions();