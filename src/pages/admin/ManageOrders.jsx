import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { ref, onValue, update } from "firebase/database";
import { Package, ChevronLeft, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ordersRef = ref(db, "orders");
    onValue(ordersRef, (snap) => {
      const data = snap.val();
      if (data) {
        const list = Object.entries(data).map(([id, val]) => ({ id, ...val })).reverse();
        setOrders(list);
      }
    });
  }, []);

  const updateStatus = async (id, status) => {
    await update(ref(db, `orders/${id}`), { status });
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen pb-20">
      <button onClick={() => navigate("/admin/dashboard")} className="mb-4 flex items-center gap-1 text-gray-500"><ChevronLeft size={18}/> Dashboard</button>
      <h1 className="text-xl font-bold mb-6">Customer Orders</h1>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="card p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-[10px] text-gray-400 font-mono">ID: {order.id.slice(-8)}</p>
                <p className="font-bold text-gray-900">{order.customer.name}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${order.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                {order.status}
              </span>
            </div>
            
            <div className="text-sm text-gray-600 mb-4 border-b border-gray-50 pb-3">
               {order.items.map(i => <span key={i.id}>{i.qty}x {i.name}, </span>)}
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
              <div className="flex gap-2">
                {order.status === 'pending' && (
                  <button onClick={() => updateStatus(order.id, 'completed')} className="bg-primary text-white p-2 rounded-lg flex items-center gap-1 text-xs px-3">
                    <CheckCircle size={14} /> Mark Delivered
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;
