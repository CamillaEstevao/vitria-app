import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Produtos from "./pages/Produtos";

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;