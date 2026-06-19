import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Produtos from "./pages/Produtos";
import Loja from "./pages/Loja";
import Aparencia from "./pages/Aparencia";
import Categorias from "./pages/Categorias";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/admin/produtos" element={<Produtos />} />

        <Route path="/loja/pertinhez" element={<Loja />} />

        <Route path="/admin/aparencia" element={<Aparencia />} />

        <Route path="/admin/categorias" element={<Categorias />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
