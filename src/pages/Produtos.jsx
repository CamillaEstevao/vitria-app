import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

const produtosIniciais = [
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

function Produtos() {
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [categorias, setCategorias] = useState([]);

  const [produtos, setProdutos] = useState(() => {
    const produtosSalvos = localStorage.getItem("vitria_produtos");
    return produtosSalvos ? JSON.parse(produtosSalvos) : produtosIniciais;
  });

  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    categoria: "",
    preco: "",
    descricao: "",
    imagem: "",
    quantidadeMinima: "1",
  });

  useEffect(() => {
    localStorage.setItem("vitria_produtos", JSON.stringify(produtos));
  }, [produtos]);

  useEffect(() => {
    const categoriasSalvas = localStorage.getItem("vitria_categorias");
    if (categoriasSalvas) setCategorias(JSON.parse(categoriasSalvas));
  }, []);

  function abrirNovoProduto() {
    setProdutoEditando(null);
    setNovoProduto({
      nome: "",
      categoria: "",
      preco: "",
      descricao: "",
      imagem: "",
      quantidadeMinima: "1",
    });
    setModalAberto(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNovoProduto({ ...novoProduto, [name]: value });
  }

  function handleImagem(event) {
    const arquivo = event.target.files[0];
    if (!arquivo) return;

    const reader = new FileReader();

    reader.onload = function () {
      setNovoProduto({
        ...novoProduto,
        imagem: reader.result,
      });
    };

    reader.readAsDataURL(arquivo);
  }

  function salvarProduto(event) {
    event.preventDefault();

    if (!novoProduto.nome || !novoProduto.preco) {
      alert("Preencha pelo menos o nome e o preço.");
      return;
    }

    const produtoFormatado = {
      id: produtoEditando ? produtoEditando.id : Date.now(),
      nome: novoProduto.nome,
      categoria: novoProduto.categoria || "Sem categoria",
      preco: novoProduto.preco.startsWith("R$")
        ? novoProduto.preco
        : `R$ ${novoProduto.preco}`,
      descricao: novoProduto.descricao,
      imagem: novoProduto.imagem,
      quantidadeMinima: Number(novoProduto.quantidadeMinima) || 1,
      status: "Ativo",
    };

    if (produtoEditando) {
      setProdutos(
        produtos.map((produto) =>
          produto.id === produtoEditando.id ? produtoFormatado : produto
        )
      );
    } else {
      setProdutos([...produtos, produtoFormatado]);
    }

    setNovoProduto({
      nome: "",
      categoria: "",
      preco: "",
      descricao: "",
      imagem: "",
      quantidadeMinima: "1",
    });

    setProdutoEditando(null);
    setModalAberto(false);
  }

  function excluirProduto(id) {
    const confirmar = window.confirm("Deseja realmente excluir este produto?");
    if (!confirmar) return;

    setProdutos(produtos.filter((produto) => produto.id !== id));
  }

  function editarProduto(produto) {
    setProdutoEditando(produto);

    setNovoProduto({
      nome: produto.nome,
      categoria: produto.categoria,
      preco: produto.preco,
      descricao: produto.descricao || "",
      imagem: produto.imagem || "",
      quantidadeMinima: produto.quantidadeMinima || "1",
    });

    setModalAberto(true);
  }

  function removerImagemProduto() {
    setNovoProduto({
      ...novoProduto,
      imagem: "",
    });
  }

  function fecharModal() {
    setModalAberto(false);
    setProdutoEditando(null);

    setNovoProduto({
      nome: "",
      categoria: "",
      preco: "",
      descricao: "",
      imagem: "",
      quantidadeMinima: "1",
    });
  }

  return (
    <AdminLayout>
      <div className="produtosHeader">
        <div>
          <h1>Produtos</h1>
          <p>Gerencie os produtos da sua loja.</p>
        </div>

        <button onClick={abrirNovoProduto}>+ Novo Produto</button>
      </div>

      <div className="produtosCard">
        <table>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Mínimo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>
                  <div className="produtoThumb">
                    {produto.imagem ? (
                      <img src={produto.imagem} alt={produto.nome} />
                    ) : (
                      <span>📦</span>
                    )}
                  </div>
                </td>

                <td>{produto.nome}</td>
                <td>{produto.categoria}</td>
                <td>{produto.preco}</td>
                <td>{produto.quantidadeMinima || 1} un.</td>
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
                <h2>{produtoEditando ? "Editar Produto" : "Novo Produto"}</h2>
                <p>
                  {produtoEditando
                    ? "Atualize as informações do produto."
                    : "Cadastre um novo item na sua vitrine."}
                </p>
              </div>

              <button className="closeModal" onClick={fecharModal}>
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
                <select
                  name="categoria"
                  value={novoProduto.categoria}
                  onChange={handleChange}
                >
                  <option value="">Selecione uma categoria</option>

                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.nome}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
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
                Quantidade mínima
                <input
                  type="number"
                  name="quantidadeMinima"
                  min="1"
                  placeholder="Ex: 12"
                  value={novoProduto.quantidadeMinima}
                  onChange={handleChange}
                />
              </label>

              <label>
                Imagem do produto
                <input type="file" accept="image/*" onChange={handleImagem} />
              </label>

              {novoProduto.imagem && (
                <div className="previewProdutoImagemBox">
                  <div className="previewProdutoImagem">
                    <img src={novoProduto.imagem} alt="Prévia do produto" />
                  </div>

                  <button
                    type="button"
                    className="removerImagemBtn"
                    onClick={removerImagemProduto}
                  >
                    Remover imagem
                  </button>
                </div>
              )}

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
                  onClick={fecharModal}
                >
                  Cancelar
                </button>

                <button type="submit" className="saveBtn">
                  {produtoEditando ? "Salvar alterações" : "Salvar produto"}
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