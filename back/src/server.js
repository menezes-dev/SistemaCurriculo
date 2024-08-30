import express from "express";
import cors from "cors";
import appRoutes from "./routes/routes.js";
import db from "./db/db.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("", appRoutes);

const port = 3001;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
