import { useState } from "react";
import { db } from "../../firebase/config";
import { ref, update } from "firebase/database";
import { useData } from "../../context/DataContext";
import { uploadImage } from "../../api/imgbb";
import { Save, ChevronLeft, Loader2, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StoreSettings = () => {
  const { settings } = useData();
  const navigate = useNavigate();
  const [form, setForm] = useState(settings);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await update(ref(db, "settings"), form);
    setLoading(false);
    alert("Settings updated!");
  };

  const handleBannerUpload = async (file) => {
    setLoading(true);
    const url = await uploadImage(file);
    if (url) setForm({ ...form, shopBanner: url });
    setLoading(false);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <button onClick={() => navigate("/admin/dashboard")} className="mb-4 flex items-center gap-1 text-gray-500"><ChevronLeft size={18}/> Dashboard</button>
      <h1 className="text-xl font-bold mb-6">Store Configuration</h1>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Shop Name</span>
            <input className="input-field mt-1" value={form.shopName} onChange={e => setForm({...form, shopName: e.target.value})} />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Shop Banner</span>
            <div className="mt-2 relative h-32 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
              <img src={form.shopBanner} className="w-full h-full object-cover" />
              <input type="file" id="banner" hidden onChange={e => handleBannerUpload(e.target.files[0])} />
              <label htmlFor="banner" className="absolute inset-0 bg-black/30 flex items-center justify-center text-white cursor-pointer">
                <ImageIcon size={24} />
              </label>
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Order Confirmation Message</span>
            <textarea className="input-field mt-1 h-24" value={form.confirmText} onChange={e => setForm({...form, confirmText: e.target.value})} />
          </label>
        </div>

        <button disabled={loading} onClick={handleSave} className="btn-primary w-full shadow-lg shadow-primary/30">
          {loading ? <Loader2 className="animate-spin" /> : <><Save size={20}/> Save All Settings</>}
        </button>
      </div>
    </div>
  );
};

export default StoreSettings;
