import { useState } from "react";
import { db } from "../../firebase/config";
import { ref, push, remove } from "firebase/database";
import { useData } from "../../context/DataContext";
import { uploadImage } from "../../api/imgbb";
import { Trash2, Plus, ChevronLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageCategories = () => {
  const { categories } = useData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  const handleAdd = async (e) => {
    e.preventDefault();
    if(!file) return alert("Select an image");
    setLoading(true);
    const imageUrl = await uploadImage(file);
    if(imageUrl) {
      await push(ref(db, "categories"), { name, image: imageUrl });
      setName(""); setFile(null);
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <button onClick={() => navigate("/admin/dashboard")} className="mb-4 flex items-center gap-1 text-gray-500"><ChevronLeft size={18}/> Dashboard</button>
      <h1 className="text-xl font-bold mb-6">Manage Categories</h1>

      <form onSubmit={handleAdd} className="mb-8 space-y-3">
        <input required className="input-field" placeholder="Category Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="file" onChange={e => setFile(e.target.files[0])} className="text-xs" />
        <button disabled={loading} className="btn-primary w-full">
          {loading ? <Loader2 className="animate-spin" /> : <><Plus size={18}/> Add Category</>}
        </button>
      </form>

      <div className="grid grid-cols-2 gap-3">
        {categories.map(c => (
          <div key={c.id} className="bg-white p-3 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={c.image} className="w-8 h-8 object-contain" />
              <span className="text-sm font-medium">{c.name}</span>
            </div>
            <button onClick={() => remove(ref(db, `categories/${c.id}`))} className="text-red-400"><Trash2 size={16}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCategories;
