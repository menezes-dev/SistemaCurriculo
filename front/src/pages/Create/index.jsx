import { useContext, useState } from "react";
import { Container } from "./styles";
import { CurriculumContext } from "../../contexts";
import { FaLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();

  const [identification, setIdentification] = useState({
    nome: "",
    email: "",
    telefone: "",
  });

  const { createCurriculum } = useContext(CurriculumContext);

  // Estado para o resumo
  const [summary, setSummary] = useState("");

  // Funções das Habilidades e Competências

  const [skills, setSkills] = useState([""]);

  const handleAddSkill = () => {
    setSkills([...skills, ""]); //isso adiciona um novo input vazio
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  // Funções da Formação acadêmica

  const [academicEntries, setAcademicEntries] = useState([
    { instituicao: "", titulo: "", cidade: "", periodo: "" },
  ]);

  const handleAddAcademicEntry = () => {
    setAcademicEntries([
      ...academicEntries,
      { instituicao: "", titulo: "", cidade: "", periodo: "" },
    ]);
  };

  const handleAcademicChange = (index, field, value) => {
    const updatedEntries = [...academicEntries];
    updatedEntries[index][field] = value;
    setAcademicEntries(updatedEntries);
  };

  // Funções para Experiência Profissional

  const [experiences, setExperiences] = useState([
    { cargo: "", local: "", periodo: "", atribuicoes: "" },
  ]);

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      { cargo: "", local: "", periodo: "", atribuicoes: "" },
    ]);
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };

  // Função de testes
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (
      !identification.nome ||
      !identification.email ||
      !identification.telefone ||
      !summary ||
      skills.some((skill) => skill === "") ||
      academicEntries.some(
        (entry) =>
          !entry.instituicao || !entry.titulo || !entry.cidade || !entry.periodo
      ) ||
      experiences.some(
        (exp) => !exp.cargo || !exp.local || !exp.periodo || !exp.atribuicoes
      )
    ) {
      toast.error("Por favor, preencha todos os campos!", {
        style: { backgroundColor: "#EBBD00", color: "black" },
        progressStyle: { backgroundColor: "white" },
      });
      return;
    }

    const formData = {
      identification,
      summary,
      skills,
      academicEntries,
      experiences,
    };

    try {
      await createCurriculum(formData);
      toast.success("Currículo cadastrado com sucesso!", {
        style: { backgroundColor: "green", color: "white" },
        progressStyle: { backgroundColor: "white" }, // Personaliza a barra de progresso
      });
      navigate("/");
    } catch (error) {
      toast.error("Erro ao cadastrar currículo. Tente novamente.", {
        style: { backgroundColor: "red", color: "white" },
        progressStyle: { backgroundColor: "white" }, // Personaliza a barra de progresso
      });
    }
  };

  return (
    <Container>
      <div className="title">
        <FaLeftLong
          style={{
            color: "var(--accent-color)",
            fontSize: 40,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        />
        <h2>Forneça as informações..</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <section className="identification">
          <h3>Identificação</h3>
          <label>
            Nome:
            <input
              type="text"
              value={identification.nome}
              onChange={(e) =>
                setIdentification({ ...identification, nome: e.target.value })
              }
              placeholder="Fulano da Silva"
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="text"
              value={identification.email}
              onChange={(e) =>
                setIdentification({ ...identification, email: e.target.value })
              }
              placeholder="email@email.com"
            />
          </label>
          <br />
          <label>
            Telefone:
            <input
              type="text"
              value={identification.telefone}
              onChange={(e) =>
                setIdentification({
                  ...identification,
                  telefone: e.target.value,
                })
              }
              placeholder="(99)99999-9999"
            />
          </label>
        </section>
        <br />

        <section className="summary">
          <h3>Resumo do candidato</h3>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Insira um resumo sobre o candidato..."
          />
        </section>
        <br />

        <section className="skills">
          <h3>Habilidades e Competências</h3>
          {skills.map((skill, index) => (
            <div key={index}>
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                placeholder={`Competência ${index + 1}`}
              />
            </div>
          ))}
          <br />
          <button type="button" onClick={handleAddSkill}>
            +
          </button>
        </section>
        <br />

        <section className="academic">
          <h3>Formação acadêmica</h3>
          {academicEntries.map((entry, index) => (
            <div key={index}>
              <label>
                Instituição:
                <input
                  type="text"
                  value={entry.instituicao}
                  onChange={(e) =>
                    handleAcademicChange(index, "instituicao", e.target.value)
                  }
                  placeholder="Nome da instituição"
                />
              </label>
              <br />
              <label>
                Título:
                <input
                  type="text"
                  value={entry.titulo}
                  onChange={(e) =>
                    handleAcademicChange(index, "titulo", e.target.value)
                  }
                  placeholder="Título obtido"
                />
              </label>
              <br />
              <label>
                Cidade:
                <input
                  type="text"
                  value={entry.cidade}
                  onChange={(e) =>
                    handleAcademicChange(index, "cidade", e.target.value)
                  }
                  placeholder="Cidade"
                />
              </label>
              <br />
              <label>
                Período:
                <input
                  type="text"
                  value={entry.periodo}
                  onChange={(e) =>
                    handleAcademicChange(index, "periodo", e.target.value)
                  }
                  placeholder="2020-2022"
                />
              </label>
              <br />
              <br />
            </div>
          ))}
          <button type="button" onClick={handleAddAcademicEntry}>
            +
          </button>
        </section>
        <br />

        <section className="experience">
          <h3>Experiência Profissional</h3>
          {experiences.map((experience, index) => (
            <div key={index}>
              <label>
                Cargo:
                <input
                  type="text"
                  value={experience.cargo}
                  onChange={(e) =>
                    handleExperienceChange(index, "cargo", e.target.value)
                  }
                  placeholder="Função desempenhada"
                />
              </label>
              <br />
              <label>
                Local:
                <input
                  type="text"
                  value={experience.local}
                  onChange={(e) =>
                    handleExperienceChange(index, "local", e.target.value)
                  }
                  placeholder="Local realizado"
                />
              </label>
              <br />
              <label>
                Período:
                <input
                  type="text"
                  value={experience.periodo}
                  onChange={(e) =>
                    handleExperienceChange(index, "periodo", e.target.value)
                  }
                  placeholder="2020-2024"
                />
              </label>
              <br />
              <label>
                Atribuições:
                <br />
                <textarea
                  value={experience.atribuicoes}
                  onChange={(e) =>
                    handleExperienceChange(index, "atribuicoes", e.target.value)
                  }
                  placeholder="Insira as funções realizadas..."
                />
              </label>
              <br />
              <br />
            </div>
          ))}
          <button type="button" onClick={handleAddExperience}>
            +
          </button>
        </section>
        <br />
        <div className="submit">
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </Container>
  );
};

export default Create;
