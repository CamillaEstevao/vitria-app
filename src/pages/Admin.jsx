import AdminLayout from "../components/AdminLayout";

function Admin() {
  return (
    <AdminLayout>
      <header className="adminTopbar">
        <div>
          <p>Bem-vinda de volta</p>
          <h1>Dashboard</h1>
        </div>

        <button>+ Novo produto</button>
      </header>

      <section className="adminStats">
        <div>
          <span>Vendas hoje</span>
          <strong>R$ 1.250,90</strong>
          <small>+12% hoje</small>
        </div>

        <div>
          <span>Pedidos</span>
          <strong>24</strong>
          <small>+8% hoje</small>
        </div>

        <div>
          <span>Produtos</span>
          <strong>156</strong>
          <small>12 categorias</small>
        </div>

        <div>
          <span>Visualizações</span>
          <strong>3.521</strong>
          <small>+18% hoje</small>
        </div>
      </section>

      <section className="adminGrid">
        <div className="adminCard chartCard">
          <div className="cardHeader">
            <h2>Vendas dos últimos 7 dias</h2>
            <span>Semana atual</span>
          </div>

          <div className="fakeChart">
            <div style={{ height: "35%" }}></div>
            <div style={{ height: "55%" }}></div>
            <div style={{ height: "42%" }}></div>
            <div style={{ height: "78%" }}></div>
            <div style={{ height: "62%" }}></div>
            <div style={{ height: "88%" }}></div>
            <div style={{ height: "70%" }}></div>
          </div>
        </div>

        <div className="adminCard">
          <div className="cardHeader">
            <h2>Pedidos recentes</h2>
            <span>Ver todos</span>
          </div>

          <div className="orders">
            <div>
              <strong>Maria Silva</strong>
              <span>Pedido #1254</span>
              <b>R$ 89,90</b>
            </div>

            <div>
              <strong>João Santos</strong>
              <span>Pedido #1255</span>
              <b>R$ 150,00</b>
            </div>

            <div>
              <strong>Ana Souza</strong>
              <span>Pedido #1256</span>
              <b>R$ 45,90</b>
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export default Admin;