import "./App.css";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import Description from "./components/Description";

function App() {
  return  (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout/>}>
           <Route index element={<Home/>}/>
           <Route path="/products" element={<Products/>}/>
           <Route path="/products/:id" element={<Description/>}/>
           <Route path="/cart" element={<Cart/>}/>
           <Route path="/contact" element={<Contact/>}/>
          </Route>
        </Routes>
      </Router>

     
      
    </div>
  );
}

export default App;
