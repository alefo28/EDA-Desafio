import CreateBalanceUsecase from "./create_balance.usecase";

describe("Create Balance usecase unit test", () => {
  const MockRespository = () => {
    return {
      create: jest.fn(),
      findAccount: jest.fn(),
      update: jest.fn()
    };
  };
  it("Should create a Balance ", async () => {
    const repository = MockRespository();
    const usecase = new CreateBalanceUsecase(repository);
    const input = {
      accountID: "1",
      balance: 100,
    };

    const output = await usecase.execute(input);

    expect(repository.create).toHaveBeenCalled();
    expect(output.Id).toBeDefined();
    expect(output.accountID).toEqual(input.accountID);
    expect(output.balance).toEqual(input.balance);
  });
});
