import createCurriculumService from "../services/createCurriculum.service.js";

const createCurriculumController = async (req, res) => {
  try {
    const result = await createCurriculumService(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao criar o currículo", error });
  }
};

export default createCurriculumController;
