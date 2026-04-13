import { useState } from "react";
import { db } from "../../firebase/config";
import { ref, push, remove } from "firebase/database";
import { useData } from "../../context/DataContext";
import { uploadImage } from "../../api/imgbb";
import { Plus, Trash2, Image as ImageIcon, Loader2, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageProducts = () => {
  const { products, categories } = useData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newProd, setNewProd] = useState({ name: "", price: "", category: "", weight: "", description: "" });
  const [imgFiles, setImgFiles] = useState([]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Upload images to ImgBB
    const imageUrls = await Promise.all(
      imgFiles.map(file => uploadImage(file))
    );

    const prodRef = ref(db, "products");
    await push(prodRef, { ...newProd, images: imageUrls.filter(Boolean) });
    setNewProd({ name: "", price: "", category: "", weight: "", description: "" });
    setImgFiles([]);
    setLoading(false);
  };

  return (
    <div className="p-4 pb-20">
      <button onClick={() => navigate("/admin/dashboard")} className="mb-4 flex items-center gap-1 text-gray-500"><ChevronLeft size={18}/> Dashboard</button>
      <h1 className="text-xl font-bold mb-4">Add New Product</h1>
      
      <form onSubmit={handleAdd} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3 mb-8">
        <input required placeholder="Product Name" className="input-field py-2 text-sm" value={newProd.name} onChange={e => setNewProd({...newProd, name: e.target.value})} />
        <div className="grid grid-cols-2 gap-2">
          <input required type="number" placeholder="Price ($)" className="input-field py-2 text-sm" value={newProd.price} onChange={e => setNewProd({...newProd, price: e.target.value})} />
          <input placeholder="Weight (e.g. 500g)" className="input-field py-2 text-sm" value={newProd.weight} onChange={e => setNewProd({...newProd, weight: e.target.value})} />
        </div>
        <select className="input-field py-2 text-sm" value={newProd.category} onChange={e => setNewProd({...newProd, category: e.target.value})}>
           <option value="">Select Category</option>
           {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <textarea placeholder="Description" className="input-field py-2 text-sm h-20" value={newProd.description} onChange={e => setNewProd({...newProd, description: e.target.value})} />
        
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
          <input 
            type="file" multiple id="imgs" hidden 
            onChange={e => setImgFiles(Array.from(e.target.files))} 
          />
          <label htmlFor="imgs" className="cursor-pointer flex flex-col items-center">
            <ImageIcon className="text-gray-300 mb-1" />
            <span className="text-xs text-gray-500">{imgFiles.length > 0 ? `${imgFiles.length} files selected` : 'Click to upload images'}</span>
          </label>
        </div>

        <button disabled={loading} className="btn-primary w-full py-2">
          {loading ? <Loader2 className="animate-spin" size={18} /> : "Save Product"}
        </button>
      </form>

      <h2 className="font-bold mb-3">Live Inventory ({products.length})</h2>
      <div className="space-y-2">
        {products.map(p => (
          <div key={p.id} className="flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-100">
            <img src={p.images?.[0]} className="w-12 h-12 rounded-lg object-cover bg-gray-50" alt="" />
            <div className="flex-1">
              <p className="text-sm font-semibold">{p.name}</p>
              <p className="text-xs text-gray-500">${p.price}</p>
            </div>
            <button onClick={() => remove(ref(db, `products/${p.id}`))} className="p-2 text-red-400"><Trash2 size={16}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
