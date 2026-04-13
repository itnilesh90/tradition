import { User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-full bg-slate-100 p-2">
            <User className="h-5 w-5 text-slate-600" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">My Account</h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Name</p>
            <p className="mt-1 font-medium text-slate-800">{user?.name}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
            <p className="mt-1 font-medium text-slate-800">{user?.email}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Role</p>
            <p className="mt-1 font-medium text-slate-800">{user?.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
