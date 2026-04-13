import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from "lucide-react";

const Cart = () => {
  const { cart, updateQty, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] px-10 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <ShoppingCart size={40} className="text-gray-300" />
        </div>
        <h2 className="text-xl font-bold">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
        <button onClick={() => navigate("/")} className="btn-primary mt-6 w-full">Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold mb-6">Shopping Cart ({cart.length})</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
            <img src={item.images?.[0] || item.image} className="w-20 h-20 object-contain bg-gray-50 rounded-xl" alt="" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
              <p className="text-xs text-gray-500 mb-2">${item.price} / unit</p>
              <div className="flex items-center gap-3">
                <button onClick={() => updateQty(item.id, -1)} className="p-1 rounded-lg border border-gray-200"><Minus size={14}/></button>
                <span className="font-bold">{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} className="p-1 rounded-lg border border-gray-200 bg-primary/5 text-primary"><Plus size={14}/></button>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="text-red-400 p-2"><Trash2 size={20}/></button>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-[32px] mt-10">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Subtotal</span>
          <span className="font-bold">${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4 border-b border-gray-700 pb-4">
          <span className="text-gray-400">Delivery Fee</span>
          <span className="text-primary font-bold text-xs uppercase">Free</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg">Total Amount</span>
          <span className="text-2xl font-bold">${cartTotal.toFixed(2)}</span>
        </div>
        <button onClick={() => navigate("/checkout")} className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
          Checkout <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Cart;
