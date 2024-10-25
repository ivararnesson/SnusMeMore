import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Checkout from "./pages/checkout";
import NotFound from "./pages/notFout";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;


