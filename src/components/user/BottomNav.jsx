import { useNavigate, useLocation } from "react-router-dom";
import { Home, ShoppingBag, User, MessageCircle, LayoutGrid } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: LayoutGrid, label: "Explore", path: "/categories" },
    { icon: ShoppingBag, label: "Cart", path: "/cart", badge: cart.length },
    { icon: MessageCircle, label: "Support", path: "/contact" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-6 py-2 flex justify-between items-center z-50 pb-safe">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center relative transition-all ${isActive ? "text-primary" : "text-gray-400"}`}
          >
            {isActive && (
              <motion.div 
                layoutId="nav-pill"
                className="absolute -top-2 w-1 h-1 bg-primary rounded-full"
              />
            )}
            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            {item.badge > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
