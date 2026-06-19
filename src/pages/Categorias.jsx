import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

const categoriasIniciais = [
  { id: 1, nome: "Vassouras" },
  { id: 2, nome: "Rodos" },
  { id: 3, nome: "Baldes" },
  { id: 4, nome: "Utilidades" },
];

function Categorias() {
  const [categorias, setCategorias] = useState(() => {
    const salvas = localStorage.getItem("vitria_categorias");
    return salvas ? JSON.parse(salvas) : categoriasIniciais;
  });

  const [nome, setNome] = useState("");

  useEffect(() => {
    localStorage.setItem("vitria_categorias", JSON.stringify(categorias));
  }, [categorias]);

  function adicionarCategoria(e) {
    e.preventDefault();

    if (!nome.trim()) {
      alert("Digite o nome da categoria.");
      return;
    }

    const novaCategoria = {
      id: Date.now(),
      nome: nome.trim(),
    };

    setCategorias([...categorias, novaCategoria]);
    setNome("");
  }

  function excluirCategoria(id) {
    const confirmar = window.confirm("Deseja excluir esta categoria?");
    if (!confirmar) return;

    setCategorias(categorias.filter((categoria) => categoria.id !== id));
  }

  return (
    <AdminLayout>
      <div className="categoriasHeader">
        <div>
          <h1>Categorias</h1>
          <p>Organize os produtos da sua loja.</p>
        </div>
      </div>

      <div className="categoriasCard">
        <form onSubmit={adicionarCategoria} className="categoriasForm">
          <input
            type="text"
            placeholder="Ex: Vassouras"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <button type="submit">+ Nova Categoria</button>
        </form>

        <div className="categoriasLista">
          {categorias.map((categoria) => (
            <div key={categoria.id} className="categoriaItem">
              <span>📂 {categoria.nome}</span>

              <button onClick={() => excluirCategoria(categoria.id)}>
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Categorias;