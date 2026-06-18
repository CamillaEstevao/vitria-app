import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

function Aparencia() {
  const [config, setConfig] = useState({
    empresa: "",
    descricao: "",
    whatsapp: "",
    cor: "#7c3aed",
  });

  useEffect(() => {
    const dados = localStorage.getItem("vitria_config");

    if (dados) {
      setConfig(JSON.parse(dados));
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setConfig({
      ...config,
      [name]: value,
    });
  }

  function salvarConfiguracoes() {
    localStorage.setItem(
      "vitria_config",
      JSON.stringify(config)
    );

    alert("Configurações salvas!");
  }

  return (
    <AdminLayout>
      <div className="aparenciaPage">
        <div className="aparenciaHeader">
          <h1>Aparência da Loja</h1>
          <p>
            Personalize sua loja virtual.
          </p>
        </div>

        <div className="aparenciaCard">
          <label>
            Nome da empresa

            <input
              type="text"
              name="empresa"
              value={config.empresa}
              onChange={handleChange}
              placeholder="Distribuidora Pertinhez"
            />
          </label>

          <label>
            Descrição

            <input
              type="text"
              name="descricao"
              value={config.descricao}
              onChange={handleChange}
              placeholder="Produtos de limpeza para sua casa ou empresa"
            />
          </label>

          <label>
            WhatsApp

            <input
              type="text"
              name="whatsapp"
              value={config.whatsapp}
              onChange={handleChange}
              placeholder="5511999999999"
            />
          </label>

          <label>
            Cor Principal

            <input
              type="color"
              name="cor"
              value={config.cor}
              onChange={handleChange}
            />
          </label>

          <button
            className="salvarConfigBtn"
            onClick={salvarConfiguracoes}
          >
            Salvar Configurações
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Aparencia;