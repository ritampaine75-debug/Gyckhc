import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { useCart } from "../../context/CartContext";
import { ChevronLeft, ShoppingBag, Star, Info } from "lucide-react";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useData();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);

  if (!product) return <div className="p-10 text-center">Loading product...</div>;

  const images = product.images || [product.image];

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-80 bg-gray-50">
        <button onClick={() => navigate(-1)} className="absolute top-6 left-4 z-10 bg-white p-2 rounded-full shadow-lg">
          <ChevronLeft size={24} />
        </button>
        <div className="flex overflow-x-auto snap-x snap-mandatory h-full no-scrollbar">
          {images.map((img, idx) => (
            <img key={idx} src={img} className="w-full h-full object-contain snap-center" alt="" />
          ))}
        </div>
      </div>

      <div className="p-6 space-y-4 -mt-6 bg-white rounded-t-[32px] relative shadow-2xl">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-500 font-medium">{product.weight || '1 unit'}</p>
          </div>
          <div className="bg-primary/10 px-3 py-1 rounded-lg flex items-center gap-1">
            <Star size={14} className="fill-primary text-primary" />
            <span className="text-primary font-bold">{product.rating || '4.5'}</span>
          </div>
        </div>

        <div className="border-t border-b border-gray-100 py-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Info size={18} className="text-primary" /> Product Description
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{product.description || "No description available."}</p>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div>
            <p className="text-gray-400 text-sm">Unit Price</p>
            <p className="text-2xl font-bold text-gray-900">${product.price}</p>
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(product)}
            className="btn-primary px-8"
          >
            <ShoppingBag size={20} />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
