import Balance from "../../entity/balance"
import UpdateBalanceUsecase from "./update_balance.usecase";

describe("Update balance usecase unit test", () => {
  const balance = new Balance({
    AccountID: "1",
    Balance: 100,
  });

  const MockRespository = () => {
    return {
      create: jest.fn(),
      findAccount: jest.fn().mockReturnValue(Promise.resolve(balance)),
      update: jest.fn(),
    };
  };

  it("Should update balance of a account",async () => {
    const balanceRepository = MockRespository();
    const usecase = new UpdateBalanceUsecase(balanceRepository);

    const input = {
      accountID: "1",
      balance: 200,
    };

    const output =await usecase.execute(input)

    expect(balanceRepository.findAccount).toHaveBeenCalled()
    expect(balanceRepository.update).toHaveBeenCalled()
    expect(output.accountID).toBe("1")
    expect(output.balance).toBe(200)

  });
});
