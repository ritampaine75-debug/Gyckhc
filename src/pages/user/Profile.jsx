import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import { ref, update } from "firebase/database";
import { LogOut, User, MapPin, Phone, Mail, Save } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const { user, userData, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(userData);

  const handleUpdate = async () => {
    try {
      await update(ref(db, `users/${user.uid}`), form);
      setEditing(false);
    } catch (err) { alert("Failed to update profile"); }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <button onClick={logout} className="text-red-500"><LogOut size={22} /></button>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg">
          <User size={48} className="text-primary" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">{userData?.name}</h2>
        <p className="text-gray-500 text-sm">{userData?.email}</p>
      </div>

      <div className="space-y-4">
        <div className="card p-4 space-y-4">
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-gray-400" />
            <input 
              disabled={!editing}
              className={`flex-1 outline-none ${editing ? 'border-b border-primary' : 'bg-transparent'}`}
              value={form?.phone} 
              onChange={e => setForm({...form, phone: e.target.value})}
              placeholder="Add Phone Number"
            />
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-gray-400" />
            <textarea 
              disabled={!editing}
              className={`flex-1 outline-none resize-none ${editing ? 'border-b border-primary' : 'bg-transparent'}`}
              value={form?.address} 
              onChange={e => setForm({...form, address: e.target.value})}
              placeholder="Add Delivery Address"
            />
          </div>
        </div>

        {editing ? (
          <button onClick={handleUpdate} className="btn-primary w-full">
            <Save size={20} /> Save Changes
          </button>
        ) : (
          <button onClick={() => setEditing(true)} className="w-full py-4 border-2 border-primary/20 text-primary font-bold rounded-2xl">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
