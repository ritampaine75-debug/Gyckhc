import { useData } from "../../context/DataContext";
import { Search, MapPin } from "lucide-react";

const Header = () => {
  const { settings } = useData();

  return (
    <header className="sticky top-0 z-40 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <img src={settings.shopLogo} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
          <div>
            <h1 className="font-bold text-gray-900 leading-tight">{settings.shopName}</h1>
            <div className="flex items-center text-[10px] text-gray-500">
              <MapPin size={10} className="text-primary mr-1" />
              <span className="truncate w-32">{settings.location}</span>
            </div>
          </div>
        </div>
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
        </div>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search fresh groceries..." 
          className="w-full bg-gray-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>
    </header>
  );
};

export default Header;
