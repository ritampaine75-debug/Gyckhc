import { useNavigate } from "react-router-dom";
import { Package, ShoppingBag, Settings, LogOut, TrendingUp, Users } from "lucide-react";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { products } = useData();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: "Products", value: products.length, icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Active Orders", value: "12", icon: ShoppingBag, color: "text-green-500", bg: "bg-green-50" },
    { label: "Total Sales", value: "$420", icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Live Users", value: "3", icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Store Admin</h1>
        <button onClick={logout} className="p-2 text-gray-400"><LogOut size={20}/></button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map(s => (
          <div key={s.label} className={`${s.bg} p-4 rounded-2xl`}>
            <s.icon className={s.color} size={24} />
            <p className="text-2xl font-bold mt-2">{s.value}</p>
            <p className="text-xs text-gray-600 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <button onClick={() => navigate("/admin/products")} className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Package className="text-primary" />
            <div className="text-left">
              <p className="font-bold">Inventory Management</p>
              <p className="text-xs text-gray-500">Add, Edit or Remove Products</p>
            </div>
          </div>
        </button>
        <button onClick={() => navigate("/admin/orders")} className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ShoppingBag className="text-primary" />
            <div className="text-left">
              <p className="font-bold">Customer Orders</p>
              <p className="text-xs text-gray-500">Track and fulfill deliveries</p>
            </div>
          </div>
        </button>
        <button onClick={() => navigate("/admin/settings")} className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Settings className="text-primary" />
            <div className="text-left">
              <p className="font-bold">Shop Settings</p>
              <p className="text-xs text-gray-500">Logo, Banner & Location</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
