import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { settings } = useData();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-white">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6"
      >
        <CheckCircle size={60} className="text-primary" />
      </motion.div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
      <p className="text-gray-500 mb-8 max-w-[250px] mx-auto">
        {settings.confirmText}
      </p>
      <div className="w-full space-y-3">
        <button onClick={() => navigate("/")} className="btn-primary w-full">
          Keep Shopping
        </button>
        <button onClick={() => navigate("/profile")} className="w-full py-4 text-gray-500 font-semibold">
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
