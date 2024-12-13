import BalanceGateway from "modules/gateway/balance.gateway";
import {
  UpdateBalanceInputDto,
  UpdateBalanceOutputDto,
} from "./update_balance.usecase.dto";
import Balance from "modules/entity/balance";
import BalanceRepository from "modules/repository/balance.repository";

export default class UpdateBalanceUsecase {
  private _BalanceRepository: BalanceGateway;

  constructor(balanceRepository: BalanceGateway) {
    this._BalanceRepository = balanceRepository;
  }

  async execute(input: UpdateBalanceInputDto): Promise<UpdateBalanceOutputDto> {

    const balance = await this._BalanceRepository.findAccount(input.accountID);
    if (!balance) {
      throw new Error("Balance not found!");
    }
    balance.Balance = input.balance

    await this._BalanceRepository.update(balance);

    return {
      Id: balance.ID,
      accountID: balance.AccountId,
      balance: balance.Balance,
      createdAt: balance.CreatedAt,
      updatedAt: balance.UpdatedAt,
    };
  }
}
