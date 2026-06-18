import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Produtos from "./pages/Produtos";
import Loja from "./pages/Loja";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
        
        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/admin/produtos"
          element={<Produtos />}
        />

        <Route
          path="/loja/pertinhez"
          element={<Loja />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;