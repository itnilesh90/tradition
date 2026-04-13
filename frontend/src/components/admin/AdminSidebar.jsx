import { createElement } from "react";
import { LayoutDashboard, Package, ShoppingBag, Tags, Video } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Tags },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/promo-videos", label: "Promo Video", icon: Video },
];

function AdminSidebar() {
  return (
    <aside className="rounded-2xl bg-white p-4 shadow-sm">
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                isActive ? "bg-slate-900 text-white" : "hover:bg-slate-100"
              }`
            }
          >
            {createElement(link.icon, { className: "h-4 w-4" })}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
