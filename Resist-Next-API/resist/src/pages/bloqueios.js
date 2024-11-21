import { useState, useEffect } from "react";
import BlockList from "../components/BlockList";
import FooterContent from "../components/FooterContent";
import HeaderBar from "../components/HeaderBar";
import NavBar from "../components/NavBar";
import axios from "axios";
import url from "../services/url"; // Supondo que o url seja o serviço para a API
import { useRouter } from "next/router";
const Bloqueios = () => {
  const usuario = { nome: "Daniel", foto: "./imgs/defaultUser.png" };
  const [urlInput, setUrlInput] = useState("");
  const [termoInput, setTermoInput] = useState("");
  const [periodoInput, setPeriodoInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()

  // Função para adicionar um novo bloqueio manual
  const adicionarBloqueioManual = async () => {
  const token = localStorage.getItem("token"); // Pegue o token armazenado
  if (!token) {
    alert("Você precisa estar autenticado!");
    return;
  }

    if (!urlInput) {
      alert("A URL é obrigatória!");
      return;
    }

    setIsSubmitting(true);

    try {
      const novoBloqueio = {
        url: urlInput,
        urlWeb: urlInput,
        motivo: termoInput || "Bloqueio Manual",
        periodo: periodoInput || "Indefinido",
        tipoInsercao: "Manual",
        ipMaquina: "192.168.1.1",
        dataHora: new Date().toISOString(),
        flag: true
      };

      const token = localStorage.getItem("token");
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const response = await axios.post(`${url}/bloqueios`, novoBloqueio);
      
      if (response.data.success) {
        setUrlInput("");
        setTermoInput("");
        setPeriodoInput("");
        alert("Bloqueio adicionado com sucesso!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao adicionar o bloqueio:", error);
      alert(error.response?.data?.error || "Erro ao adicionar o bloqueio. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  return (
    <>
      <section className="container-principal">
        <NavBar />
        <section className="main-container">
          <HeaderBar usuario={usuario} />
          <section className="flex flex-col gap-5 overflow-hidden">
            {/* Dashboard Principal */}
            <section className="flex flex-row px-5 lg:px-2 mt-5 lg:mt-0 gap-1 max-w-">
              <div className="bg-gradient-to-r from-laranja-s h-fit to-laranja-e p-5 rounded-xl">
                <p className="text-2xl text-white">
                  Acesso aos dados de bloqueio manuais e automáticos.
                </p>
              </div>
            </section>
            <section className="flex flex-col-reverse lg:grid lg:grid-cols-3 mb-10 gap-10 lg:gap-2 lg:px-2 lg:mb-0 px-5">
              <BlockList />
              <div className="flex flex-col w-full col-span-1">
                <div className="p-3 gap-5">
                  <h3 className="text-azul-text font-bold text-lg">Bloqueio Manual</h3>
                </div>
                <div className="flex flex-col bg-white rounded-xl p-5 max-w-full h-full max-h-100 gap-5 justify-between">
                  <div className="flex flex-col gap-5">
                    <input
                      type="text"
                      placeholder="URL"
                      className="border-2 border-azul-cinza-claro text-azul-text w-full h-fit p-3 rounded-xl"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Motivo (opcional)"
                      className="border-2 border-azul-cinza-claro text-azul-text w-full h-fit p-3 rounded-xl"
                      value={termoInput}
                      onChange={(e) => setTermoInput(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Período (opcional)"
                      className="border-2 border-azul-cinza-claro text-azul-text w-full h-fit p-3 rounded-xl"
                      value={periodoInput}
                      onChange={(e) => setPeriodoInput(e.target.value)}
                    />
                  </div>
                  <div>
                    <button
                      className="text-white bg-azul-buttom w-full h-fit rounded-xl p-3"
                      onClick={adicionarBloqueioManual}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Adicionando..." : "Adicionar Bloqueio Manual"}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </section>
      </section>
      <FooterContent />
    </>
  );
};

export default Bloqueios;
