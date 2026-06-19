import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

function Aparencia() {
  const [config, setConfig] = useState({
    empresa: "",
    descricao: "",
    whatsapp: "",
    cor: "#7c3aed",
    logo: "",
    banner: "",
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

  function handleLogo(event) {
    const arquivo = event.target.files[0];

    if (!arquivo) return;

    const reader = new FileReader();

    reader.onload = function () {
      setConfig({
        ...config,
        logo: reader.result,
      });
    };

    reader.readAsDataURL(arquivo);
  }

  function handleBanner(event) {
    const arquivo = event.target.files[0];

    if (!arquivo) return;

    const reader = new FileReader();

    reader.onload = function () {
      const img = new Image();

      img.onload = function () {
        const canvas = document.createElement("canvas");
        const larguraMaxima = 1200;
        const escala = larguraMaxima / img.width;

        canvas.width = larguraMaxima;
        canvas.height = img.height * escala;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imagemComprimida = canvas.toDataURL("image/jpeg", 0.7);

        setConfig((configAtual) => ({
          ...configAtual,
          banner: imagemComprimida,
        }));
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(arquivo);
  }

  function removerLogo() {
    setConfig({
      ...config,
      logo: "",
    });
  }

  function salvarConfiguracoes() {
    try {
      localStorage.setItem("vitria_config", JSON.stringify(config));
      alert("Configurações salvas!");
    } catch (error) {
      alert("Imagem muito pesada. Use uma imagem menor.");
    }
  }

  return (
    <AdminLayout>
      <div className="aparenciaPage">
        <div className="aparenciaHeader">
          <h1>Aparência da Loja</h1>
          <p>Personalize sua loja virtual.</p>
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

          <label>
            Logo da Empresa
            <input type="file" accept="image/*" onChange={handleLogo} />
          </label>

          {config.logo && (
            <div className="previewLogo">
              <img src={config.logo} alt="Logo da empresa" />

              <button type="button" onClick={removerLogo}>
                Remover logo
              </button>
            </div>
          )}

          <label>
            Banner da Loja
            <input type="file" accept="image/*" onChange={handleBanner} />
          </label>

          {config.banner && (
            <div className="previewBanner">
              <img src={config.banner} alt="Banner da loja" />

              <button
                type="button"
                onClick={() =>
                  setConfig({
                    ...config,
                    banner: "",
                  })
                }
              >
                Remover banner
              </button>
            </div>
          )}

          <button
            className="salvarConfigBtn"
            style={{ background: config.cor }}
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
