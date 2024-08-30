import db from "../db/db.js";

const createCurriculumService = async (data) => {
  const { identification, summary, skills, academicEntries, experiences } =
    data;

  return new Promise((resolve, reject) => {
    // Inserção básica na tabela de candidatos
    db.run(
      `INSERT INTO candidatos (nome, email, telefone, resumo) VALUES (?, ?, ?, ?)`,
      [
        identification.nome,
        identification.email,
        identification.telefone,
        summary,
      ],
      function (err) {
        if (err) {
          return reject({
            message: "Erro ao inserir dados do candidato",
            error: err,
          });
        }

        const candidatoId = this.lastID;

        // Inserir as habilidades associadas ao candidato
        skills.forEach((skill) => {
          db.run(
            `INSERT INTO habilidades (candidato_id, habilidade) VALUES (?, ?)`,
            [candidatoId, skill],
            (err) => {
              if (err) {
                console.error("Erro ao inserir habilidade:", err.message);
              }
            }
          );
        });

        // Inserir as entradas de formação acadêmica associadas ao candidato
        academicEntries.forEach((entry) => {
          db.run(
            `INSERT INTO formacao_academica (candidato_id, instituicao, titulo, cidade, periodo) VALUES (?, ?, ?, ?, ?)`,
            [
              candidatoId,
              entry.instituicao,
              entry.titulo,
              entry.cidade,
              entry.periodo,
            ],
            (err) => {
              if (err) {
                console.error(
                  "Erro ao inserir formação acadêmica:",
                  err.message
                );
              }
            }
          );
        });

        // Inserir as experiências profissionais associadas ao candidato
        experiences.forEach((experience) => {
          db.run(
            `INSERT INTO experiencias_profissionais (candidato_id, cargo, local, periodo, atribuicoes) VALUES (?, ?, ?, ?, ?)`,
            [
              candidatoId,
              experience.cargo,
              experience.local,
              experience.periodo,
              experience.atribuicoes,
            ],
            (err) => {
              if (err) {
                console.error(
                  "Erro ao inserir experiência profissional:",
                  err.message
                );
              }
            }
          );
        });

        resolve({ message: "Currículo criado com sucesso!", candidatoId });
      }
    );
  });
};

export default createCurriculumService;
