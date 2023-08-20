import "@fontsource/poppins";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";
import ThemeLayout from "./Layouts/ThemeLayout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider
      dense
      preventDuplicate
      maxSnack={3}
      autoHideDuration={5000}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
    >
      <ThemeLayout>
        <App />
      </ThemeLayout>
    </SnackbarProvider>
  </React.StrictMode>
);
