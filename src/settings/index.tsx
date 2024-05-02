import { createRoot } from "react-dom/client";
import { Settings } from "./settings";

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById("app")!);

root.render(
    <Settings />
);
