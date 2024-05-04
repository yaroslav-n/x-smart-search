export const isDarkColor = (color: string) => {
    let newColor = color;
    if (color.startsWith('rgb')) {
        newColor = `#${color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)!.slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
    }

    const hex = newColor.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
}