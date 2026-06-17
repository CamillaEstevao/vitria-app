import { features, brands, products } from "./data";

function App() {
  return (
    <div className="page">
      <header className="header">
        <div className="logo">
          <span className="logoIcon">V</span>
          <span>Vitria</span>
        </div>

        <nav className="nav">
          <a href="#recursos">Recursos</a>
          <a href="#precos">Preços</a>
          <a href="#exemplos">Exemplos</a>
          <a href="#contato">Contato</a>
        </nav>

        <div className="headerActions">
          <button className="loginBtn">Entrar</button>
          <button className="primaryBtn small">Começar agora</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="heroText">
            <div className="badge">
              <span>NOVO</span>
              A nova forma de vender pelo WhatsApp
            </div>

            <h1>
              Vitria = sua <span>vitrine digital</span> inteligente.
            </h1>

            <p>
              Crie sua vitrine online em minutos, receba pedidos pelo WhatsApp
              e impulsione suas vendas com uma experiência moderna.
            </p>

            <div className="heroButtons">
              <button className="primaryBtn">Criar minha vitrine grátis</button>
              <button className="playBtn">
                <span>▶</span>
                Ver como funciona
              </button>
            </div>

            <div className="heroInfo">
              <div>💳 Sem cartão de crédito</div>
              <div>⚙️ Configuração em minutos</div>
              <div>🎧 Suporte humanizado</div>
            </div>
          </div>

          <div className="heroMockup">
            <div className="desktopMockup">
              <div className="storeHeader">
                <div className="storeLogo">🧁</div>
                <div>
                  <h3>Confeitaria Doce Sabor</h3>
                  <p>Bolos, doces e salgados feitos com amor</p>
                </div>
              </div>

              <div className="searchBox">Buscar produtos...</div>

              <div className="tabs">
                <span>Todos</span>
                <span>Bolos</span>
                <span>Doces</span>
                <span>Salgados</span>
              </div>

              <div className="productGrid">
                {products.map((product) => (
                  <div className="productCard" key={product.name}>
                    <img src={product.image} alt={product.name} />
                    <h4>{product.name}</h4>
                    <p>{product.price}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="phoneMockup">
              <div className="phoneTop"></div>
              <h4>Confeitaria Doce Sabor</h4>
              <p>Bolos e doces feitos com amor</p>
              <button>Falar no WhatsApp</button>

              <div className="phoneList">
                {products.map((product) => (
                  <div className="phoneItem" key={product.name}>
                    <img src={product.image} alt={product.name} />
                    <div>
                      <strong>{product.name}</strong>
                      <span>{product.price}</span>
                    </div>
                    <b>+</b>
                  </div>
                ))}
              </div>
            </div>

            <div className="floatingCard">
              <span>🛍️</span>
              <div>
                <strong>Mais praticidade.</strong>
                <p>Mais vendas. Mais resultados.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="brands">
          <p>Empresas que já transformaram suas vendas com a Vitria</p>

          <div>
            {brands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </section>

        <section className="features" id="recursos">
          <div className="sectionTitle">
            <span>RECURSOS</span>
            <h2>
              Tudo que você precisa para <strong>vender mais</strong>
            </h2>
            <p>
              A Vitria oferece as ferramentas certas para você focar no que
              realmente importa: atender bem e vender mais.
            </p>
            <button className="primaryBtn">Ver todos os recursos</button>
          </div>

          <div className="featuresGrid">
            {features.map((feature) => (
              <article className="featureCard" key={feature.title}>
                <div>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta">
          <div>
            <span>COMECE AGORA</span>
            <h2>Crie sua vitrine grátis e comece a vender hoje</h2>
            <p>
              Sem complicação, sem burocracia e sem cartão de crédito. Em
              poucos minutos você já estará no ar.
            </p>
            <button className="whiteBtn">Criar minha vitrine grátis</button>
          </div>

          <div className="dashboard">
            <aside>
              <strong>Vitria</strong>
              <p>Início</p>
              <p>Produtos</p>
              <p>Pedidos</p>
              <p>Clientes</p>
              <p>Relatórios</p>
            </aside>

            <div className="dashboardContent">
              <h3>Resumo</h3>

              <div className="stats">
                <div>
                  <span>Vendas hoje</span>
                  <strong>R$ 1.250,90</strong>
                </div>
                <div>
                  <span>Pedidos hoje</span>
                  <strong>24</strong>
                </div>
                <div>
                  <span>Produtos</span>
                  <strong>156</strong>
                </div>
              </div>

              <div className="chart">
                <div style={{ height: "35%" }}></div>
                <div style={{ height: "55%" }}></div>
                <div style={{ height: "45%" }}></div>
                <div style={{ height: "70%" }}></div>
                <div style={{ height: "60%" }}></div>
                <div style={{ height: "85%" }}></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contato">
        <div>
          <div className="logo">
            <span className="logoIcon">V</span>
            <span>Vitria</span>
          </div>
          <p>Sua vitrine digital inteligente.</p>
        </div>

        <div>
          <h4>Produto</h4>
          <a href="#recursos">Recursos</a>
          <a href="#precos">Preços</a>
          <a href="#exemplos">Exemplos</a>
        </div>

        <div>
          <h4>Empresa</h4>
          <a href="#sobre">Sobre nós</a>
          <a href="#blog">Blog</a>
          <a href="#contato">Contato</a>
        </div>

        <div>
          <h4>Suporte</h4>
          <a href="#ajuda">Central de ajuda</a>
          <a href="#politicas">Políticas</a>
          <a href="#status">Status</a>
        </div>
      </footer>
    </div>
  );
}

export default App;