import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRouter from ".//Routes/index.routes";
import './App.css'
function App() {
  const isAdmin = true; // later: dynamic login

  return (
    <div className="app">
      <Navbar isAdmin={isAdmin} />
      <AppRouter isAdmin={isAdmin} />
      <Footer />
    </div>
  );
}

export default App;