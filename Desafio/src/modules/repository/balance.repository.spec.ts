import { Sequelize } from "sequelize-typescript";
import { BalanceModel } from "./balance.model";
import BalanceRepository from "./balance.repository";
import Balance from "../entity/balance";

describe("Balance Repository Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {
        force: true,
      },
    });

    await sequelize.addModels([BalanceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should findAccount a Account", async () => {
    const Account = await BalanceModel.create({
      ID: "1",
      AccountID: "1a",
      Balance: 100,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    });

    const repository = new BalanceRepository();
    const output = await repository.findAccount("1a");

    expect(output.ID).toBe(Account.ID);
    expect(output.AccountId).toBe(Account.AccountID);
    expect(output.Balance).toBe(Account.Balance);
  });

  it("Should Create a Balance", async () => {
    const balance = new Balance({ AccountID: "1a", Balance: 100 });

    const repository = new BalanceRepository();
    await repository.create(balance);

    const balanceDB = await BalanceModel.findOne({ where: { ID: balance.ID } });

    expect(balanceDB).toBeDefined();
    expect(balanceDB?.ID).toBe(balance.ID);
    expect(balanceDB?.AccountID).toBe(balance.AccountId);
    expect(balanceDB?.Balance).toBe(balance.Balance);
  });

  it("Should Update a Balance", async () => {
    await BalanceModel.create({
      ID: "1",
      AccountID: "1a",
      Balance: 100,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    });

    const repository = new BalanceRepository();

    const updateBalance = new Balance({ AccountID: "1a", Balance: 200 });

    await repository.update(updateBalance);

    const balanceDB = await BalanceModel.findOne({
      where: { AccountID: updateBalance.AccountId },
    });

    const balance = balanceDB?.toJSON();

    expect(balance.ID).toBe("1")
    expect(balance.AccountID).toBe("1a")
    expect(balance.Balance).toBe(200)

  });
});
