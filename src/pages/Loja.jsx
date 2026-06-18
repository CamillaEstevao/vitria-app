import { useEffect, useState } from "react";

const produtosPadrao = [
  {
    id: 1,
    nome: "Vassoura Multiuso",
    categoria: "Limpeza",
    preco: "R$ 18,90",
    status: "Ativo",
    imagem: "",
  },
  {
    id: 2,
    nome: "Rodo 40cm",
    categoria: "Limpeza",
    preco: "R$ 15,90",
    status: "Ativo",
    imagem: "",
  },
];

function Loja() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const produtosSalvos = localStorage.getItem("vitria_produtos");

    if (produtosSalvos) {
      setProdutos(JSON.parse(produtosSalvos));
    } else {
      setProdutos(produtosPadrao);
    }
  }, []);

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  function alterarQuantidade(id, quantidade) {
    const novaQuantidade = Number(quantidade);

    if (novaQuantidade < 1) return;

    setCarrinho(
      carrinho.map((item) =>
        item.id === id ? { ...item, quantidade: novaQuantidade } : item,
      ),
    );
  }

  function adicionarAoCarrinho(produto) {
    const produtoExiste = carrinho.find((item) => item.id === produto.id);

    if (produtoExiste) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        ),
      );
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  }

  const total = carrinho.reduce((acc, item) => {
    const valor = parseFloat(
      item.preco.replace("R$", "").replace(".", "").replace(",", ".").trim(),
    );

    return acc + (isNaN(valor) ? 0 : valor * item.quantidade);
  }, 0);

  function finalizarWhatsApp() {
    if (total < 50) {
      alert("O pedido mínimo é de R$ 50,00.");
      return;
    }

    let mensagem = "Olá! Gostaria de fazer o seguinte pedido:%0A%0A";

    carrinho.forEach((produto) => {
      mensagem += `• ${produto.nome} - Qtd: ${produto.quantidade} - ${produto.preco}%0A`;
    });

    mensagem += `%0A💰 Total: R$ ${total.toFixed(2)}`;

    window.open(`https://wa.me/5511999999999?text=${mensagem}`, "_blank");
  }

  return (
    <div className="lojaPage">
      <header className="lojaHeader">
        <div>
          <span className="lojaLogo">P</span>
          <div>
            <h1>Distribuidora Pertinhez</h1>
            <p>Produtos de limpeza para sua casa ou empresa</p>
          </div>
        </div>

        <a href="https://wa.me/5511952570819" target="_blank" rel="noreferrer">
          Falar no WhatsApp
        </a>
      </header>

      <section className="lojaHero">
        <div>
          <span>CATÁLOGO ONLINE</span>
          <h2>Compre produtos de limpeza de forma rápida e prática</h2>
          <p>
            Escolha os produtos, monte seu pedido e finalize direto pelo
            WhatsApp.
          </p>
        </div>
      </section>

      <section className="lojaContent">
        <div className="lojaBusca">
          <input
            type="text"
            placeholder="Buscar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="carrinhoCard">
          <h3>🛒 Meu Pedido ({carrinho.length})</h3>

          {carrinho.length === 0 ? (
            <div className="carrinhoVazio">
              <span>🛒</span>
              <h4>Seu pedido está vazio</h4>
              <p>Adicione produtos para montar seu pedido.</p>
            </div>
          ) : (
            <>
              <ul>
                {carrinho.map((item) => (
                  <li key={item.id} className="carrinhoItem">
                    <span>
                      {item.nome} - {item.preco}
                    </span>

                    <input
                      type="number"
                      min="1"
                      value={item.quantidade}
                      onChange={(e) =>
                        alterarQuantidade(item.id, e.target.value)
                      }
                    />
                  </li>
                ))}
              </ul>

              <h4>Total: R$ {total.toFixed(2)}</h4>

              <button onClick={finalizarWhatsApp}>
                Finalizar pelo WhatsApp
              </button>
            </>
          )}
        </div>

        <div className="lojaProdutos">
          {produtosFiltrados.map((produto) => (
            <article className="lojaProdutoCard" key={produto.id}>
              <div className="produtoImagem">
                {produto.imagem && produto.imagem.startsWith("http") ? (
                  <img src={produto.imagem} alt={produto.nome} />
                ) : (
                  <span>📦</span>
                )}
              </div>

              <small>{produto.categoria}</small>
              <h3>{produto.nome}</h3>
              <strong>{produto.preco}</strong>

              <button onClick={() => adicionarAoCarrinho(produto)}>
                Adicionar ao pedido
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Loja;
