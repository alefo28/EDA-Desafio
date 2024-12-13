import { Sequelize } from "sequelize-typescript";
import express, { Express } from "express";
import request from "supertest";
import { balanceRoute } from "./balance.route";
import { BalanceModel } from "../modules/repository/balance.model";

describe("Balance Route Test", () => {
  const app: Express = express();
  app.use(express.json());
  app.use("/balances", balanceRoute);

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([BalanceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should Find Account", async () => {
    await BalanceModel.create({
      ID: "1",
      AccountID: "1a",
      Balance: 100,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    });
    const response = await request(app).get(`/balances/1a`);    

    expect(response.body.Id).toBeDefined();
    expect(response.body.accountID).toEqual("1a");
    expect(response.body.balance).toEqual(100);
  });
});
