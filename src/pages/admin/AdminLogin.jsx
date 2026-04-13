import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ShieldLock } from "lucide-react";

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
      <ShieldLock size={60} className="text-primary mb-4" />
      <h1 className="text-2xl font-bold mb-2">Admin Portal</h1>
      <p className="text-gray-500 mb-8">Enter access code to manage store</p>
      <input 
        type="password" 
        className="input-field text-center text-2xl tracking-[10px]" 
        placeholder="••••••" 
        value={pass} 
        onChange={e => setPass(e.target.value)}
      />
      <button onClick={handleLogin} className="btn-primary w-full mt-6">Verify & Enter</button>
    </div>
  );
};

export default AdminLogin;
