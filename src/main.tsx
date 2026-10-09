import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import Favorite from "./Context/Favorite.js";
import AuthProvider from "./Context/AuthContext.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Favorite>
        <App />
      </Favorite>
    </AuthProvider>
  </StrictMode>,
);
