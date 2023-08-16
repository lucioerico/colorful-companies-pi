import Sequelize from "sequelize";
import dotenv from "dotenv/config.js";

const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASS;

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  dialect: "postgres",
  host: dbHost,
});

// Adicionando as colunas 'city', 'address', 'password' e 'declarationPrivacy' à tabela 'People'
/* sequelize.query(`
  ALTER TABLE "People"
  ADD COLUMN city VARCHAR(100),
  ADD COLUMN address VARCHAR(100),
  ADD COLUMN password VARCHAR(100),
  ADD COLUMN declarationPrivacy BOOLEAN;
`); */


export default sequelize;