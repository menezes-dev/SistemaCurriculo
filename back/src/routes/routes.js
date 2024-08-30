import { Router } from "express";
import createCurriculumController from "../controllers/createCurriculum.controller.js";
import readCurriculumController from "../controllers/readCurriculum.controller.js";
import deleteCurriculumController from "../controllers/deleteCurriculum.controller.js";

const appRoutes = Router();

appRoutes.post("/create", createCurriculumController);
appRoutes.get("/list", readCurriculumController);
appRoutes.delete("/delete/:id", deleteCurriculumController);

export default appRoutes;
