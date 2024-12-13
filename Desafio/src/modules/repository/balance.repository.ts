import Balance from "../entity/balance";
import BalanceGateway from "../gateway/balance.gateway";
import { BalanceModel } from "./balance.model";

export default class BalanceRepository implements BalanceGateway {

  async update(balance: Balance): Promise<void> {
    try {
      await BalanceModel.update(
        {
          Balance: balance.Balance,
          UpdatedAt: new Date(Date.now()),
        },
        {
          where: { AccountID: balance.AccountId },
        }
      );
    } catch (error) {
      throw new Error("Balance not found");
    }
    
  }

  async create(balance: Balance): Promise<void> {
    await BalanceModel.create({
      ID: balance.ID,
      AccountID: balance.AccountId,
      Balance: balance.Balance,
      CreatedAt: balance.CreatedAt,
      UpdatedAt: balance.UpdatedAt,
    });
  }

  async findAccount(id: string): Promise<Balance> {
    const balance = await BalanceModel.findOne({ where: { AccountID: id } });

    if (!balance) {
      throw new Error("Account not found");
    }

    return new Balance({
      ID: balance.ID,
      AccountID: balance.AccountID,
      Balance: balance.Balance,
      CreatedAt: balance.CreatedAt,
      UpdatedAt: balance.UpdatedAt,
    });
  }
}
