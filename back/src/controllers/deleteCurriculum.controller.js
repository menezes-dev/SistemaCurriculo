import deleteCurriculumService from "../services/deleteCurriculum.service.js";

const deleteCurriculumController = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteCurriculumService(id);
    return res.status(204).send(); // 204 indica sucesso, mas sem conteúdo de retorno
  } catch (error) {
    if (error.message === "Currículo não encontrado") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Erro ao apagar currículo" });
  }
};

export default deleteCurriculumController;
