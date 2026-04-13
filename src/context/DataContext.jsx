import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/config";
import { ref, onValue } from "firebase/database";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState({
    shopName: "FreshMart",
    shopLogo: "https://cdn-icons-png.flaticon.com/512/3724/3724720.png",
    shopBanner: "https://img.freepik.com/free-vector/grocery-store-sale-banner-template_23-2151088424.jpg",
    location: "New York, USA",
    confirmText: "Your order has been received and will be delivered shortly!",
    contactText: "Contact us at support@freshmart.com or call +1 234 567 890"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prodRef = ref(db, "products");
    const catRef = ref(db, "categories");
    const settingsRef = ref(db, "settings");

    onValue(prodRef, (snap) => {
      const data = snap.val();
      setProducts(data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : []);
    });

    onValue(catRef, (snap) => {
      const data = snap.val();
      setCategories(data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : []);
    });

    onValue(settingsRef, (snap) => {
      if (snap.exists()) setSettings(snap.val());
      setLoading(false);
    });
  }, []);

  return (
    <DataContext.Provider value={{ products, categories, settings, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
