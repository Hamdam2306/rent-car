import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Router } from "./routes/routes";
import Sidebar from "./admin/components/sidebar";

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen">
      {isAdminRoute && <Sidebar />}
      <div
        className={isAdminRoute ? "w-[calc(100vw-256px)]  ml-60" : "w-[100vw] "}
      >
        <Router />
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </StrictMode>
);
