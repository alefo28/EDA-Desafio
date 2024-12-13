import BalanceGateway from "../../gateway/balance.gateway";
import {
  FindAccountInputDto,
  FindAccountOutputDto,
} from "./find_account.usecase.dto";

export default class FindAccountUsecase {
  private _BalanceRepository: BalanceGateway;

  constructor(balanceRepository: BalanceGateway) {
    this._BalanceRepository = balanceRepository;
  }

  async execute(input: FindAccountInputDto): Promise<FindAccountOutputDto> {
    const result = await this._BalanceRepository.findAccount(input.accountID);
    return {
      Id: result.ID,
      accountID: result.AccountId,
      balance: result.Balance,
      createdAt: result.CreatedAt,
    };
  }
}
