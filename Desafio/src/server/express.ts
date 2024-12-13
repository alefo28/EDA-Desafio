import { Sequelize } from "sequelize-typescript";
import { balanceRoute } from "../routes/balance.route";
import express, { Express } from "express";
import { BalanceModel } from "../modules/repository/balance.model";

export const app: Express = express();
app.use(express.json());
app.use("/balances", balanceRoute);

export let sequelize: Sequelize;

async function setupDb() {
  const sequelize = new Sequelize({
    dialect: "mysql",
    host: "mysqlDesafio",
    port: 3306,
    username: "root",
    password: "root",
    database: "desafio",
    logging: false,
  });

  sequelize.addModels([BalanceModel]);

  await sequelize.sync({ force: false });
}

try {
  setupDb();
} catch (error) {
  console.log(error);
}
