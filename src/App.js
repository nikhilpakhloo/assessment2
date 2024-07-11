import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { ProductProvider } from "./ProductContext";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <ProductProvider>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </ProductProvider>
    </>
  );
}

export default App;
