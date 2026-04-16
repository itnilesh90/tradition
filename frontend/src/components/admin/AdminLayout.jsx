import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[240px_1fr]">
      <AdminSidebar />
      <main className="min-h-[70vh] rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
