import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { ProductProvider } from "./ProductContext";

function App() {
  return (
    <>
      <ProductProvider>
        <Navbar />
        <Home />
      </ProductProvider>
    </>
  );
}

export default App;
