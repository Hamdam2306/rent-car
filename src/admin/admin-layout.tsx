import { Outlet } from "react-router-dom";
import Sidebar from "../admin/components/sidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-4">
        <Outlet />
      </main>
    </div>
  );
}
