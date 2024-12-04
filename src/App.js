import { Route, Routes } from "react-router-dom";
import "./App.css";
// import CustomForm from "./components/CustomForm";
import NavBar from "./components/NavBar";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
      {/* <CustomForm/> */}
    </div>
  );
}

export default App;
