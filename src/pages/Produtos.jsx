import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

const produtosIniciais = [
  {
    id: 1,
    nome: "Vassoura Multiuso",
    categoria: "Limpeza",
    preco: "R$ 18,90",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Rodo 40cm",
    categoria: "Limpeza",
    preco: "R$ 15,90",
    status: "Ativo",
  },
];

function Produtos() {
  const [modalAberto, setModalAberto] = useState(false);

  const [produtos, setProdutos] = useState(() => {
    const produtosSalvos = localStorage.getItem("vitria_produtos");

    if (produtosSalvos) {
      return JSON.parse(produtosSalvos);
    }

    return produtosIniciais;
  });

  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    categoria: "",
    preco: "",
    descricao: "",
    imagem: "",
  });

  useEffect(() => {
    localStorage.setItem("vitria_produtos", JSON.stringify(produtos));
  }, [produtos]);

  function handleChange(event) {
    const { name, value } = event.target;

    setNovoProduto({
      ...novoProduto,
      [name]: value,
    });
  }

  function salvarProduto(event) {
    event.preventDefault();

    if (!novoProduto.nome || !novoProduto.preco) {
      alert("Preencha pelo menos o nome e o preço.");
      return;
    }

    const produto = {
      id: Date.now(),
      nome: novoProduto.nome,
      categoria: novoProduto.categoria || "Sem categoria",
      preco: novoProduto.preco.startsWith("R$")
        ? novoProduto.preco
        : `R$ ${novoProduto.preco}`,
      descricao: novoProduto.descricao,
      imagem: novoProduto.imagem,
      status: "Ativo",
    };

    setProdutos([...produtos, produto]);

    setNovoProduto({
      nome: "",
      categoria: "",
      preco: "",
      descricao: "",
      imagem: "",
    });

    setModalAberto(false);
  }

  function excluirProduto(id) {
    const confirmar = window.confirm("Deseja realmente excluir este produto?");

    if (!confirmar) return;

    setProdutos(produtos.filter((produto) => produto.id !== id));
  }

  function editarProduto(produto) {
    alert(`Em breve iremos editar: ${produto.nome}`);
  }

  return (
    <AdminLayout>
      <div className="produtosHeader">
        <div>
          <h1>Produtos</h1>
          <p>Gerencie os produtos da sua loja.</p>
        </div>

        <button onClick={() => setModalAberto(true)}>+ Novo Produto</button>
      </div>

      <div className="produtosCard">
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.categoria}</td>
                <td>{produto.preco}</td>
                <td>
                  <span className="statusAtivo">{produto.status}</span>
                </td>
                <td>
                  <div className="acoes">
                    <button
                      className="btnEditar"
                      onClick={() => editarProduto(produto)}
                    >
                      ✏️
                    </button>

                    <button
                      className="btnExcluir"
                      onClick={() => excluirProduto(produto.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAberto && (
        <div className="modalOverlay">
          <div className="produtoModal">
            <div className="modalHeader">
              <div>
                <h2>Novo Produto</h2>
                <p>Cadastre um novo item na sua vitrine.</p>
              </div>

              <button
                className="closeModal"
                onClick={() => setModalAberto(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={salvarProduto} className="produtoForm">
              <label>
                Nome do produto
                <input
                  type="text"
                  name="nome"
                  placeholder="Ex: Vassoura Piaçava"
                  value={novoProduto.nome}
                  onChange={handleChange}
                />
              </label>

              <label>
                Categoria
                <input
                  type="text"
                  name="categoria"
                  placeholder="Ex: Limpeza"
                  value={novoProduto.categoria}
                  onChange={handleChange}
                />
              </label>

              <label>
                Preço
                <input
                  type="text"
                  name="preco"
                  placeholder="Ex: R$ 19,90"
                  value={novoProduto.preco}
                  onChange={handleChange}
                />
              </label>

              <label>
                URL da imagem
                <input
                  type="text"
                  name="imagem"
                  placeholder="Cole o link da imagem"
                  value={novoProduto.imagem}
                  onChange={handleChange}
                />
              </label>

              <label>
                Descrição
                <textarea
                  name="descricao"
                  placeholder="Descrição do produto"
                  value={novoProduto.descricao}
                  onChange={handleChange}
                />
              </label>

              <div className="modalActions">
                <button
                  type="button"
                  className="cancelBtn"
                  onClick={() => setModalAberto(false)}
                >
                  Cancelar
                </button>

                <button type="submit" className="saveBtn">
                  Salvar produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Produtos;
