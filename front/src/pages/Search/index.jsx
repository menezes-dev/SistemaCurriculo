import { useContext, useEffect, useState } from "react";
import { CurriculumContext } from "../../contexts";
import { Container } from "./styles";
import { FaLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Search = () => {
  const { listCurriculum, deleteCurriculum } = useContext(CurriculumContext);
  const [curriculums, setCurriculums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const curriculumsPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    listCurriculum()
      .then((data) => {
        if (Array.isArray(data)) {
          setCurriculums(data);
        } else {
          toast.error("Erro ao buscar currículos");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar currículos:", error);
      });
  }, [listCurriculum]);

  const handleDelete = async (id) => {
    try {
      await deleteCurriculum(id);
      setCurriculums(curriculums.filter((curriculum) => curriculum.id !== id)); // Atualiza a lista local
      toast.success("Currículo deletado com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro ao deletar!");
    }
  };

  const handlePrint = (curriculum) => {
    const printContent = `
      <div>
        <h3>Currículo de ${curriculum.nome}</h3>
        <p><strong>Email:</strong> ${curriculum.email}</p>
        <p><strong>Telefone:</strong> ${curriculum.telefone}</p>
        <p><strong>Resumo:</strong> ${curriculum.resumo}</p>
        <p><strong>Habilidades:</strong> ${curriculum.habilidades.join(
          ", "
        )}</p>
        <p><strong>Formação Acadêmica:</strong></p>
        <ul>
          ${curriculum.formacao_academica
            .map(
              (formacao) => `
            <li>${formacao.titulo} - ${formacao.instituicao}, ${formacao.cidade} (${formacao.periodo})</li>
          `
            )
            .join("")}
        </ul>
        <p><strong>Experiências Profissionais:</strong></p>
        <ul>
          ${curriculum.experiencias_profissionais
            .map(
              (experiencia) => `
            <li>${experiencia.cargo} - ${experiencia.local} (${experiencia.periodo})<br />${experiencia.atribuicoes}</li>
          `
            )
            .join("")}
        </ul>
      </div>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir Currículo</title>
          <style>
            @page { margin: 0; }
            body { margin: 1cm; }
            /* Esconder a URL e a data */
            @media print {
              body::before, body::after {
                content: none !important;
              }
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const matchesSearchTerm = (curriculum) => {
    const search = searchTerm.toLowerCase();

    return (
      curriculum.nome.toLowerCase().includes(search) ||
      curriculum.email.toLowerCase().includes(search) ||
      curriculum.telefone.includes(search) ||
      curriculum.resumo.toLowerCase().includes(search) ||
      curriculum.habilidades.some((habilidade) =>
        habilidade.toLowerCase().includes(search)
      ) ||
      curriculum.formacao_academica.some(
        (formacao) =>
          formacao.instituicao.toLowerCase().includes(search) ||
          formacao.titulo.toLowerCase().includes(search) ||
          formacao.cidade.toLowerCase().includes(search)
      ) ||
      curriculum.experiencias_profissionais.some(
        (experiencia) =>
          experiencia.cargo.toLowerCase().includes(search) ||
          experiencia.local.toLowerCase().includes(search) ||
          experiencia.atribuicoes.toLowerCase().includes(search)
      )
    );
  };

  const filteredCurriculums = curriculums.filter(matchesSearchTerm);

  const indexOfLastCurriculum = currentPage * curriculumsPerPage;
  const indexOfFirstCurriculum = indexOfLastCurriculum - curriculumsPerPage;
  const currentCurriculums = filteredCurriculums.slice(
    indexOfFirstCurriculum,
    indexOfLastCurriculum
  );

  const totalPages = Math.ceil(filteredCurriculums.length / curriculumsPerPage);

  const pageNumbersToShow = 5;
  const startPage = Math.max(
    1,
    currentPage - Math.floor(pageNumbersToShow / 2)
  );
  const endPage = Math.min(totalPages, startPage + pageNumbersToShow - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <div className="busca">
        <FaLeftLong
          style={{
            color: "var(--accent-color)",
            fontSize: 40,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        />
        <h3>Pesquise pela base...</h3>
        <input
          type="text"
          placeholder="Buscar por nome, email, telefone, resumo, etc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {currentCurriculums && currentCurriculums.length > 0 ? (
        <>
          <ul>
            {currentCurriculums.map((curriculum) => (
              <li key={curriculum.id}>
                <strong>{curriculum.nome}</strong> - {curriculum.email} -{" "}
                {curriculum.telefone}
                <br />
                <em>{curriculum.resumo}</em>
                <br />
                <div className="actions">
                  <button onClick={() => handlePrint(curriculum)}>
                    Imprimir
                  </button>
                  <button
                    className="delete"
                    style={{
                      backgroundColor: "var(--danger-color)",
                      color: "white",
                    }}
                    onClick={() => handleDelete(curriculum.id)}
                  >
                    Excluir
                  </button>
                </div>
                <br />
                <br />
              </li>
            ))}
          </ul>

          {/* Paginação */}
          <div className="paginacao">
            {currentPage > 1 && (
              <button onClick={() => paginate(currentPage - 1)}>
                Anterior
              </button>
            )}

            {Array.from(
              { length: endPage - startPage + 1 },
              (_, index) => startPage + index
            ).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                style={{
                  fontWeight: number === currentPage ? "bold" : "normal",
                }}
              >
                {number}
              </button>
            ))}

            {currentPage < totalPages && (
              <button onClick={() => paginate(currentPage + 1)}>Próximo</button>
            )}
          </div>
        </>
      ) : (
        <p>Nenhum currículo encontrado.</p>
      )}
    </Container>
  );
};

export default Search;
