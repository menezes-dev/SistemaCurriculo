import db from "../db/db.js";

const readCurriculumService = () => {
  return new Promise((resolve, reject) => {
    // Consulta com JOIN para buscar todos os dados de uma vez
    const query = `
      SELECT 
        candidatos.id AS candidato_id, 
        candidatos.nome, 
        candidatos.email, 
        candidatos.telefone, 
        candidatos.resumo, 
        habilidades.habilidade, 
        formacao_academica.instituicao, 
        formacao_academica.titulo, 
        formacao_academica.cidade, 
        formacao_academica.periodo, 
        experiencias_profissionais.cargo, 
        experiencias_profissionais.local, 
        experiencias_profissionais.periodo AS experiencia_periodo, 
        experiencias_profissionais.atribuicoes 
      FROM candidatos
      LEFT JOIN habilidades ON candidatos.id = habilidades.candidato_id
      LEFT JOIN formacao_academica ON candidatos.id = formacao_academica.candidato_id
      LEFT JOIN experiencias_profissionais ON candidatos.id = experiencias_profissionais.candidato_id
    `;

    db.all(query, (err, rows) => {
      if (err) {
        return reject({ message: "Erro ao buscar currículos", error: err });
      }

      // organizando os dados para que cada candidato tenha seus dados relacionados agrupados
      const candidatos = {};

      rows.forEach((row) => {
        const candidatoId = row.candidato_id;

        if (!candidatos[candidatoId]) {
          candidatos[candidatoId] = {
            id: candidatoId,
            nome: row.nome,
            email: row.email,
            telefone: row.telefone,
            resumo: row.resumo,
            habilidades: [],
            formacao_academica: [],
            experiencias_profissionais: [],
          };
        }

        // Adicionar habilidades
        if (row.habilidade) {
          candidatos[candidatoId].habilidades.push(row.habilidade);
        }

        // Adicionar formação acadêmica
        if (row.instituicao && row.titulo) {
          candidatos[candidatoId].formacao_academica.push({
            instituicao: row.instituicao,
            titulo: row.titulo,
            cidade: row.cidade,
            periodo: row.periodo,
          });
        }

        // Adicionar experiências profissionais
        if (row.cargo && row.local) {
          candidatos[candidatoId].experiencias_profissionais.push({
            cargo: row.cargo,
            local: row.local,
            periodo: row.experiencia_periodo,
            atribuicoes: row.atribuicoes,
          });
        }
      });

      // Converte o objeto em um array e retorna
      resolve(Object.values(candidatos));
    });
  });
};

export default readCurriculumService;
