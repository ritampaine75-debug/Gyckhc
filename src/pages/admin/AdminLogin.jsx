import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react"; // Changed ShieldLock to Lock

const AdminLogin = () => {
  const [pass, setPass] = useState("");
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (adminLogin(pass)) navigate("/admin/dashboard");
    else alert("Incorrect Code");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <Lock size={40} className="text-primary" /> 
      </div>
      <h1 className="text-2xl font-bold mb-2">Admin Portal</h1>
      <p className="text-gray-500 mb-8">Enter access code to manage store</p>
      
      <div className="w-full space-y-4">
        <input 
          type="password" 
          className="input-field text-center text-2xl tracking-[10px] font-bold" 
          placeholder="••••••" 
          value={pass} 
          onChange={e => setPass(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        />
        <button onClick={handleLogin} className="btn-primary w-full mt-6 py-4 shadow-lg shadow-primary/20">
          Verify & Enter
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
