import Balance from "../../entity/balance";
import BalanceGateway from "../../gateway/balance.gateway";
import {
  CreateBalanceInputDto,
  CreateBalanceOutputDto,
} from "./create_balance.usecase.dto";

export default class CreateBalanceUsecase {
  private _BalanceRepository: BalanceGateway;

  constructor(balanceRepository: BalanceGateway) {
    this._BalanceRepository = balanceRepository;
  }

  async execute(input: CreateBalanceInputDto): Promise<CreateBalanceOutputDto> {
    const props = {
      AccountID: input.accountID,
      Balance: input.balance,
    };

    const balance = new Balance(props);
    await this._BalanceRepository.create(balance);

    return {
      Id: balance.ID,
      accountID: balance.AccountId,
      balance: balance.Balance,
      createdAt: balance.CreatedAt,
      updatedAt: balance.UpdatedAt,
    };
  }
}
