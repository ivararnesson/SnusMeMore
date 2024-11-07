import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from "./components/navbar";
import "./assets/CSS/master.css";
import TopRatedSnus from "./components/TopRatedSnus";
import SearchResults from './components/SearchResults';
import SnusList from './components/SnusList';
import Checkout from "./pages/checkout";
import NotFound from "./pages/notFound";
import LoginForm from "./components/LoginForm";
import ProductPage from "./pages/SpecificSnusView";
import Footer from "./components/Footer";
import MainPage from './components/MainPage';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/snuslist" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        {/* <Route path="/tobakssnus" element={<SnusList categoryFilter="Tobak"brandFilter="all" />} />
        <Route path="/vittsnus" element={<SnusList categoryFilter="VittSnus" brandFilter="all" />} />
        <Route path="/nikotinfritt" element={<SnusList categoryFilter="Nikotinfritt" brandFilter="all" />} />
        <Route path="/vittobakssnus" element={<SnusList categoryFilter="VitTobak" brandFilter="all" />} />
        <Route path="/knox" element={<SnusList categoryFilter="all" brandFilter="Knox" />} />
        <Route path="/velo" element={<SnusList categoryFilter="all" brandFilter="Velo" />} />
        <Route path="/lundgrens" element={<SnusList categoryFilter="all" brandFilter="Lundgrens" />} />
        <Route path="/one" element={<SnusList categoryFilter="all" brandFilter="One" />} />
        <Route path="/kaliber" element={<SnusList categoryFilter="all" brandFilter="Kaliber" />} /> */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/productpage" element={<ProductPage />} />
      </Routes>

      {location.pathname !== "/checkout" && <Footer />}
    </>
  );
}

export default App;
