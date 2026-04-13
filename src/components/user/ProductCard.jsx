import { Plus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl border border-gray-100 p-3 flex flex-col"
    >
      <div 
        className="relative mb-3 bg-gray-50 rounded-xl overflow-hidden aspect-square"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img 
          src={product.images ? product.images[0] : product.image} 
          alt={product.name}
          className="w-full h-full object-contain p-2"
          loading="lazy"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
            {product.discount}% OFF
          </div>
        )}
      </div>
      
      <div onClick={() => navigate(`/product/${product.id}`)}>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
        <p className="text-[10px] text-gray-500 mb-2">{product.weight || '1kg'}</p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <span className="font-bold text-gray-900">${product.price}</span>
        <button 
          onClick={() => addToCart(product)}
          className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center active:bg-primary active:text-white transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
