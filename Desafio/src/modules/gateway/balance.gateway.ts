import Balance from "../entity/balance";

export default interface BalanceGateway {
  create(balance: Balance): Promise<void>;
  findAccount(id: string): Promise<Balance>;
  update(balance: Balance): Promise<void>;
}
