import { useEffect, useState } from "react";

const produtosPadrao = [
  {
    id: 1,
    nome: "Vassoura Multiuso",
    categoria: "Vassouras",
    preco: "R$ 18,90",
    status: "Ativo",
    descricao: "Produto de qualidade para uso doméstico e comercial.",
    imagem: "",
    quantidadeMinima: 1,
  },
  {
    id: 2,
    nome: "Rodo 40cm",
    categoria: "Rodos",
    preco: "R$ 15,90",
    status: "Ativo",
    descricao: "Rodo resistente para limpeza geral.",
    imagem: "",
    quantidadeMinima: 1,
  },
];

function Loja() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [carrinho, setCarrinho] = useState([]);

  const [config, setConfig] = useState({
    empresa: "Distribuidora Pertinhez",
    descricao: "Produtos de limpeza para sua casa ou empresa.",
    whatsapp: "5511999999999",
    cor: "#0f3d2e",
    logo: "",
    banner: "",
  });

  useEffect(() => {
    const produtosSalvos = localStorage.getItem("vitria_produtos");
    setProdutos(produtosSalvos ? JSON.parse(produtosSalvos) : produtosPadrao);

    const categoriasSalvas = localStorage.getItem("vitria_categorias");
    if (categoriasSalvas) setCategorias(JSON.parse(categoriasSalvas));

    const configSalva = localStorage.getItem("vitria_config");
    if (configSalva) {
      setConfig({
        empresa: "Distribuidora Pertinhez",
        descricao: "Produtos de limpeza para sua casa ou empresa.",
        whatsapp: "5511999999999",
        cor: "#0f3d2e",
        logo: "",
        banner: "",
        ...JSON.parse(configSalva),
      });
    }
  }, []);

  const categoriasDaLoja = [{ id: "todos", nome: "Todos" }, ...categorias];

  const produtosFiltrados = produtos.filter((produto) => {
    const buscaOk = produto.nome.toLowerCase().includes(busca.toLowerCase());
    const categoriaOk =
      categoriaAtiva === "Todos" || produto.categoria === categoriaAtiva;

    return buscaOk && categoriaOk;
  });

  function formatarPreco(preco) {
    if (!preco) return "R$ 0,00";
    return preco.startsWith("R$") ? preco : `R$ ${preco}`;
  }

  function valorNumero(preco) {
    return parseFloat(
      formatarPreco(preco)
        .replace("R$", "")
        .replace(".", "")
        .replace(",", ".")
        .trim(),
    );
  }

  function produtoEstaNoCarrinho(id) {
    return carrinho.some((item) => item.id === id);
  }

  function adicionarAoCarrinho(produto) {
    const produtoExiste = carrinho.find((item) => item.id === produto.id);
    const minimo = produto.quantidadeMinima || 1;

    if (produtoExiste) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + minimo,
              }
            : item,
        ),
      );
    } else {
      setCarrinho([
        ...carrinho,
        {
          ...produto,
          quantidade: minimo,
        },
      ]);
    }
  }

  function aumentarQuantidade(id) {
    setCarrinho(
      carrinho.map((item) =>
        item.id === id
          ? {
              ...item,
              quantidade: item.quantidade + (item.quantidadeMinima || 1),
            }
          : item,
      ),
    );
  }

  function diminuirQuantidade(id) {
    setCarrinho(
      carrinho.map((item) => {
        if (item.id !== id) return item;

        const minimo = item.quantidadeMinima || 1;
        const novaQuantidade = item.quantidade - minimo;

        return {
          ...item,
          quantidade: novaQuantidade < minimo ? minimo : novaQuantidade,
        };
      }),
    );
  }

  function alterarQuantidade(id, quantidade) {
    const novaQuantidade = Number(quantidade);
    const item = carrinho.find((produto) => produto.id === id);
    const minimo = item?.quantidadeMinima || 1;

    if (novaQuantidade < minimo) {
      alert(`Quantidade mínima deste produto: ${minimo} unidades.`);
      return;
    }

    setCarrinho(
      carrinho.map((item) =>
        item.id === id ? { ...item, quantidade: novaQuantidade } : item,
      ),
    );
  }

  function removerDoCarrinho(id) {
    setCarrinho(carrinho.filter((item) => item.id !== id));
  }

  const total = carrinho.reduce((acc, item) => {
    const valor = valorNumero(item.preco);
    return acc + (isNaN(valor) ? 0 : valor * item.quantidade);
  }, 0);

  function finalizarWhatsApp() {
    if (carrinho.length === 0) {
      alert("Adicione produtos à cotação.");
      return;
    }

    let mensagem = "Olá! Gostaria de solicitar uma cotação:%0A%0A";

    carrinho.forEach((produto) => {
      mensagem += `• ${produto.nome} - Qtd: ${
        produto.quantidade
      } - ${formatarPreco(produto.preco)}%0A`;
    });

    mensagem += `%0A💰 Total estimado: R$ ${total
      .toFixed(2)
      .replace(".", ",")}`;

    window.open(`https://wa.me/${config.whatsapp}?text=${mensagem}`, "_blank");
  }

  return (
    <div
      className="lojaAtacadoPage"
      style={{ "--cor-principal": config.cor || "#0f3d2e" }}
    >
      <header className="lojaAtacadoHeader">
        <div className="lojaBrand">
          {config.logo ? (
            <img src={config.logo} alt={config.empresa} />
          ) : (
            <div className="lojaBrandIcon">
              {config.empresa ? config.empresa.charAt(0) : "V"}
            </div>
          )}

          <div>
            <h1>{config.empresa}</h1>
            <p>{config.descricao}</p>
          </div>
        </div>

        <nav className="lojaMenu">
          <a href="#inicio">Início</a>
          <a href="#categorias">Categorias</a>
          <a href="#produtos">Produtos</a>
          <a href="#atacado">Atacado</a>
          <a href="#contato">Contato</a>
        </nav>

        <a
          href={`https://wa.me/${config.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="whatsHeaderBtn"
        >
          💬 Fale no WhatsApp
        </a>
      </header>

      <main>
        <section
          id="inicio"
          className="lojaAtacadoHero"
          style={
            config.banner
              ? {
                  backgroundImage: `linear-gradient(90deg, rgba(255,255,255,.92), rgba(255,255,255,.58)), url(${config.banner})`,
                }
              : {}
          }
        >
          <div className="heroAtacadoTexto">
            <span>CATÁLOGO ONLINE PARA ATACADO</span>
            <h2>Soluções inteligentes para o seu negócio.</h2>
            <p>
              Escolha seus produtos, monte sua cotação e envie direto pelo
              WhatsApp para nossa equipe.
            </p>

            <div className="heroAtacadoActions">
              <a href="#produtos">Ver catálogo de produtos</a>
              <button onClick={finalizarWhatsApp}>Solicitar cotação</button>
            </div>
          </div>
        </section>

        <section className="lojaBeneficiosRapidos">
          <div>🏭 Fabricação própria</div>
          <div>🚚 Entrega rápida</div>
          <div>✅ Qualidade comprovada</div>
          <div>🎧 Atendimento especializado</div>
        </section>

        <section id="categorias" className="lojaSecao">
          <div className="lojaSecaoHeader">
            <h2>Explore nossas categorias</h2>
            <span>{categorias.length} categorias</span>
          </div>

          <div className="categoriasAtacado">
            {categoriasDaLoja.map((categoria) => (
              <button
                key={categoria.id}
                className={categoriaAtiva === categoria.nome ? "active" : ""}
                onClick={() => setCategoriaAtiva(categoria.nome)}
              >
                <span>{categoria.nome === "Todos" ? "🏠" : "📦"}</span>
                {categoria.nome}
              </button>
            ))}
          </div>
        </section>

        <section id="produtos" className="lojaSecao">
          <div className="lojaSecaoHeader">
            <h2>Produtos em destaque</h2>
            <span>{produtosFiltrados.length} produtos</span>
          </div>

          <div className="buscaAtacado">
            <input
              type="text"
              placeholder="Buscar produto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className="produtosAtacadoGrid">
            {produtosFiltrados.map((produto) => (
              <article className="produtoAtacadoCard" key={produto.id}>
                <div className="produtoAtacadoImagem">
                  {produto.imagem ? (
                    <img src={produto.imagem} alt={produto.nome} />
                  ) : (
                    <span>📦</span>
                  )}
                </div>

                <small>{produto.categoria}</small>
                <h3>{produto.nome}</h3>
                <p>{produto.descricao || "Produto para cotação no atacado."}</p>
                <strong>{formatarPreco(produto.preco)}</strong>

                <div className="produtoMinimo">
                  Pedido mínimo: {produto.quantidadeMinima || 1} un.
                </div>

                <div className="controleCard">
                  {produtoEstaNoCarrinho(produto.id) ? (
                    <>
                      <button onClick={() => diminuirQuantidade(produto.id)}>
                        -
                      </button>

                      <span>
                        {
                          carrinho.find((item) => item.id === produto.id)
                            ?.quantidade
                        }
                      </span>

                      <button onClick={() => aumentarQuantidade(produto.id)}>
                        +
                      </button>
                    </>
                  ) : (
                    <div className="controleVazio"></div>
                  )}
                </div>

                <button
                  className={
                    produtoEstaNoCarrinho(produto.id) ? "produtoAdicionado" : ""
                  }
                  onClick={() => adicionarAoCarrinho(produto)}
                >
                  {produtoEstaNoCarrinho(produto.id)
                    ? "✓ Já adicionado"
                    : "Adicionar à cotação"}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="atacado" className="comoFuncionaAtacado">
          <div>
            <h2>Como funciona sua compra no atacado?</h2>
            <p>Um processo simples, rápido e direto pelo WhatsApp.</p>
          </div>

          <div className="passosAtacado">
            <div>
              🛒 <span>Escolha os produtos</span>
            </div>
            <div>
              🧾 <span>Adicione à cotação</span>
            </div>
            <div>
              💬 <span>Envie pelo WhatsApp</span>
            </div>
            <div>
              🎧 <span>Receba atendimento</span>
            </div>
            <div>
              ✅ <span>Confirme o pedido</span>
            </div>
            <div>
              🚚 <span>Receba com segurança</span>
            </div>
          </div>
        </section>

        <section className="cotacaoAtacado">
          <div className="cotacaoBox">
            <h2>🛒 Minha cotação ({carrinho.length})</h2>

            {carrinho.length === 0 ? (
              <p>Nenhum produto adicionado à cotação.</p>
            ) : (
              <>
                <div className="cotacaoLista">
                  {carrinho.map((item) => (
                    <div className="cotacaoItem" key={item.id}>
                      <div>
                        <strong>{item.nome}</strong>
                        <span>
                          {formatarPreco(item.preco)} | Mínimo:{" "}
                          {item.quantidadeMinima || 1} un.
                        </span>
                      </div>

                      <div className="quantidadeBox">
                        <button
                          type="button"
                          onClick={() => diminuirQuantidade(item.id)}
                        >
                          -
                        </button>

                        <input
                          type="number"
                          min={item.quantidadeMinima || 1}
                          value={item.quantidade}
                          onChange={(e) =>
                            alterarQuantidade(item.id, e.target.value)
                          }
                        />

                        <button
                          type="button"
                          onClick={() => aumentarQuantidade(item.id)}
                        >
                          +
                        </button>
                      </div>

                      <button onClick={() => removerDoCarrinho(item.id)}>
                        Remover
                      </button>
                    </div>
                  ))}
                </div>

                <h3>Total estimado: R$ {total.toFixed(2).replace(".", ",")}</h3>

                <button
                  className="finalizarCotacao"
                  onClick={finalizarWhatsApp}
                >
                  Finalizar cotação pelo WhatsApp
                </button>
              </>
            )}
          </div>
        </section>
      </main>

      <footer id="contato" className="lojaAtacadoFooter">
        <div>
          <h3>{config.empresa}</h3>
          <p>{config.descricao}</p>
        </div>

        <div>
          <h4>Atendimento</h4>
          <p>Segunda a sexta</p>
          <p>08h às 18h</p>
        </div>

        <div>
          <h4>Contato</h4>
          <p>WhatsApp: {config.whatsapp}</p>
          <a
            href={`https://wa.me/${config.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            Enviar mensagem
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Loja;
