// Import required modules
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import custom CSS stylesheets
import "./index.css";

// Import Application file
import App from "./App.tsx"

// Create a single page root element/app
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
