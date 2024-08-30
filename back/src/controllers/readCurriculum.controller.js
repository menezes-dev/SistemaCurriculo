import readCurriculumService from "../services/readCurriculum.service.js";

const readCurriculumController = async (req, res) => {
  try {
    const result = await readCurriculumService();
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar currículos", error });
  }
};

export default readCurriculumController;
