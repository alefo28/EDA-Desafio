import Balance from "./balance";

describe("Test Balance Entity", () => {
  it("Create a Balance", () => {
    const account = new Balance({ AccountID: "1", Balance: 100 });

    expect(account.ID).toBeDefined();
    expect(account.AccountId).toBe("1");
    expect(account.Balance).toBe(100);
  });
});
