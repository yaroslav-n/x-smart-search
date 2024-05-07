import { isDarkColor } from "../util/is_dark_color";

export const isDarkMode = () => {
    const backgroundColor = document.body.style.backgroundColor;
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches || isDarkColor(backgroundColor);

    return isDarkMode;
}