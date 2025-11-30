import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRouter from "./Routes/index.routes";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./components/ToastContainer";
import './App.css';

function App() {
  const isAdmin = false; // later: dynamic login

  return (
    <CartProvider>
      <ToastProvider>
        <div className="app">
          <Navbar isAdmin={isAdmin} />
          <AppRouter isAdmin={isAdmin} />
          <Footer />
        </div>
      </ToastProvider>
    </CartProvider>
  );
}

export default App;