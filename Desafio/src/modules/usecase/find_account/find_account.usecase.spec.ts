import Balance from "../../entity/balance"
import FindAccountUsecase from "./find_account.usecase"

describe('Find Account Unit Test', () => {

    const balance = new Balance({
        AccountID:"1",
        Balance:100
    })

    const MockRespository = () => {
        return {
            create: jest.fn(),
            findAccount: jest.fn().mockReturnValue(Promise.resolve(balance)),
            update: jest.fn()
        }
    }

  it("should findAccount a Account",async ()=>{
        const repository = MockRespository()
        const usecase = new FindAccountUsecase(repository)

        const input ={
            accountID: "1"
        } 

        const output = await usecase.execute(input)

        expect(repository.findAccount).toHaveBeenCalled()
        expect(output.Id).toBeDefined()
        expect(output.accountID).toEqual("1")
        expect(output.balance).toEqual(100)
  })
})
