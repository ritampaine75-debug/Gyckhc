import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// User Pages
import Home from './pages/user/Home';
import ProductDetails from './pages/user/ProductDetails';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import Profile from './pages/user/Profile';
import OrderSuccess from './pages/user/OrderSuccess';
import Contact from './pages/user/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';
import StoreSettings from './pages/admin/StoreSettings';

// Shared Components
import BottomNav from './components/user/BottomNav';
import Header from './components/user/Header';

const App = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-24 shadow-xl relative">
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<><Header /><Home /><BottomNav /></>} />
        <Route path="/product/:id" element={<><ProductDetails /><BottomNav /></>} />
        <Route path="/cart" element={<><Cart /><BottomNav /></>} />
        <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <><Profile /><BottomNav /></> : <Navigate to="/" />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/contact" element={<><Contact /><BottomNav /></>} />

        {/* Admin Routes */}
        <Route path="/admin" element={isAdmin ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
        <Route path="/admin/dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin" />} />
        <Route path="/admin/products" element={isAdmin ? <ManageProducts /> : <Navigate to="/admin" />} />
        <Route path="/admin/orders" element={isAdmin ? <ManageOrders /> : <Navigate to="/admin" />} />
        <Route path="/admin/settings" element={isAdmin ? <StoreSettings /> : <Navigate to="/admin" />} />
      </Routes>
    </div>
  );
};

export default App;
