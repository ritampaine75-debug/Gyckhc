import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import { ref, push, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ChevronLeft } from "lucide-react";

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: userData?.name || "",
    phone: userData?.phone || "",
    address: userData?.address || "",
    city: "",
    pin: userData?.pin || ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const orderRef = ref(db, "orders");
    const newOrder = {
      userId: user.uid,
      items: cart,
      total: cartTotal,
      customer: form,
      status: "pending",
      date: new Date().toISOString(),
      paymentMethod: "COD"
    };

    try {
      await push(orderRef, newOrder);
      clearCart();
      navigate("/order-success");
    } catch (err) {
      alert("Order failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-gray-500 font-medium">
        <ChevronLeft size={20} /> Back to Cart
      </button>
      <h1 className="text-2xl font-bold mb-6">Delivery Details</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required placeholder="Full Name" className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input required placeholder="Phone Number" className="input-field" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
        <textarea required placeholder="Full Address" className="input-field h-24" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
        <div className="grid grid-cols-2 gap-4">
          <input required placeholder="City" className="input-field" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
          <input required placeholder="PIN Code" className="input-field" value={form.pin} onChange={e => setForm({...form, pin: e.target.value})} />
        </div>

        <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl flex items-center gap-3 mt-6">
          <div className="w-6 h-6 rounded-full border-4 border-primary bg-white"></div>
          <div>
            <p className="font-bold text-gray-900">Cash on Delivery</p>
            <p className="text-xs text-gray-500">Pay when your items arrive</p>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full mt-6 py-4 shadow-lg shadow-primary/20">
          {loading ? "Placing Order..." : `Place Order • $${cartTotal.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
