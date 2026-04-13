import { useData } from "../../context/DataContext";
import ProductCard from "../../components/user/ProductCard";
import { motion } from "framer-motion";

const Home = () => {
  const { products, categories, settings } = useData();

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-40 rounded-3xl overflow-hidden relative"
      >
        <img src={settings.shopBanner} className="w-full h-full object-cover" alt="Promo" />
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-center px-6">
          <span className="text-white bg-primary w-fit px-3 py-1 rounded-full text-[10px] font-bold mb-2 uppercase tracking-wider">Fresh Daily</span>
          <h2 className="text-white text-xl font-bold leading-tight">Get 20% OFF on<br/>Your First Order</h2>
        </div>
      </motion.div>

      {/* Categories */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-900">Shop by Category</h2>
          <button className="text-primary text-xs font-semibold">See all</button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col items-center gap-2 min-w-[70px]">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center p-3">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-contain" />
              </div>
              <span className="text-[11px] font-medium text-gray-700">{cat.name}</span>
            </div>
          ))}
          {categories.length === 0 && (
             [1,2,3,4,5].map(i => (
              <div key={i} className="min-w-[70px] animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl"></div>
                <div className="w-10 h-2 bg-gray-200 mt-2 mx-auto rounded"></div>
              </div>
             ))
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-900">Popular items</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products.length === 0 && (
            [1,2,3,4].map(i => (
              <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse"></div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
