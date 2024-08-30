import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// Obtem o nome do arquivo atual e o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define o caminho absoluto para o arquivo do banco de dados na pasta "db"
const dbPath = path.resolve(__dirname, "database.db");

// Inicializa a conexão com o banco de dados SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite");

    // Cria as tabelas se elas não existirem
    db.run(`
      CREATE TABLE IF NOT EXISTS candidatos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        telefone TEXT NOT NULL,
        resumo TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS habilidades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        candidato_id INTEGER NOT NULL,
        habilidade TEXT NOT NULL,
        FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS formacao_academica (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        candidato_id INTEGER NOT NULL,
        instituicao TEXT NOT NULL,
        titulo TEXT NOT NULL,
        cidade TEXT NOT NULL,
        periodo TEXT NOT NULL,
        FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS experiencias_profissionais (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        candidato_id INTEGER NOT NULL,
        cargo TEXT NOT NULL,
        local TEXT NOT NULL,
        periodo TEXT NOT NULL,
        atribuicoes TEXT NOT NULL,
        FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
      )
    `);
  }
});

export default db;
