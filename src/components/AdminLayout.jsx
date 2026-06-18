import { NavLink } from "react-router-dom";

function AdminLayout({ children }) {
  return (
    <div className="adminPage">
      <aside className="adminSidebar">
        <div className="adminLogo">
          <span>V</span>
          <strong>Vitria</strong>
        </div>

        <nav>
          <NavLink to="/admin">🏠 Dashboard</NavLink>
          <NavLink to="/admin/produtos">📦 Produtos</NavLink>
          <NavLink to="/admin/categorias">🗂️ Categorias</NavLink>
          <NavLink to="/admin/pedidos">🛒 Pedidos</NavLink>
          <NavLink to="/admin/aparencia">🎨 Aparência</NavLink>
          <NavLink to="/admin/configuracoes">⚙️ Configurações</NavLink>
        </nav>
      </aside>

      <main className="adminMain">{children}</main>
    </div>
  );
}

export default AdminLayout;