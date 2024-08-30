import db from "../db/db.js";

const deleteCurriculumService = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM candidatos 
      WHERE id = ?
    `;

    db.run(query, [id], function (err) {
      if (err) {
        return reject(err);
      }

      // Verifica se alguma linha foi afetada (currículo realmente deletado)
      if (this.changes === 0) {
        return reject(new Error("Currículo não encontrado"));
      }

      resolve({ message: "Currículo deletado com sucesso!" });
    });
  });
};

export default deleteCurriculumService;
