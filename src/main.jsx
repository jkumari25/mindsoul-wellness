import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter, useLocation } from "react-router-dom";
// import "antd/dist/reset.css";
import { HelmetProvider } from "react-helmet-async";

const NO_CHROME_ROUTES = ["/super-admin"];

function Shell() {
  const { pathname } = useLocation();
  const hideChrome = NO_CHROME_ROUTES.includes(pathname);
  return (
    <>
      {!hideChrome && <Navbar />}
      <App />
      {!hideChrome && <Footer />}
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <AuthProvider>
        <StrictMode>
          <Shell />
        </StrictMode>
      </AuthProvider>
    </BrowserRouter>
  </HelmetProvider>,
);
