import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "stream-chat-react/dist/css/v2/index.css";
import "./index.css";
import App from "./App.jsx";
import { useThemeStore } from "./store/useThemeStore.jsx";

// إنشاء QueryClient
const queryClient = new QueryClient();

// استرجاع الثيم المحفوظ أو الافتراضي
const savedTheme = localStorage.getItem("theme") || "light";

// تطبيق الثيم مباشرة على Zustand و <html>
useThemeStore.getState().setTheme(savedTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
