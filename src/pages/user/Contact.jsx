import { useData } from "../../context/DataContext";
import { ChevronLeft, Phone, Mail, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const { settings } = useData();
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white min-h-screen">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-gray-500">
        <ChevronLeft size={20} /> Back
      </button>
      <h1 className="text-2xl font-bold mb-4">Contact Support</h1>
      <div className="card p-6 bg-primary/5 border-none mb-8">
        <p className="text-gray-700 leading-relaxed">{settings.contactText}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
            <Phone size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500">Call Us</p>
            <p className="font-bold">+1 234 567 890</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <Mail size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500">Email Us</p>
            <p className="font-bold">support@freshmart.com</p>
          </div>
        </div>
        <button className="btn-primary w-full mt-10">
          <MessageSquare size={20} /> Chat with us
        </button>
      </div>
    </div>
  );
};

export default Contact;
