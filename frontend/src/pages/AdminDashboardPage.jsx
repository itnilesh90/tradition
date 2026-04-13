import { useEffect, useState } from 'react';
import { Package, ShoppingBag, Users, Video } from 'lucide-react';
import { fetchDashboardStats } from '../services/adminService';
import Loader from '../components/common/Loader';

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-rose-100 p-2 text-rose-600">
          {icon}
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-stone-500">{label}</p>
          <p className="text-xl font-semibold text-stone-900">{value ?? 0}</p>
        </div>
      </div>
    </div>
  );
}

function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return <Loader text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-stone-900">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<ShoppingBag size={18} />} label="Products" value={stats?.products} />
        <StatCard icon={<Package size={18} />} label="Orders" value={stats?.orders} />
        <StatCard icon={<Users size={18} />} label="Users" value={stats?.users ?? 0} />
        <StatCard icon={<Video size={18} />} label="Revenue" value={`₹${stats?.totalRevenue ?? 0}`} />
      </div>
      <div className="rounded-lg border border-stone-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-stone-900">Catalog Summary</h2>
        <p className="mt-2 text-sm text-stone-600">Categories: {stats?.categories ?? 0}</p>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
