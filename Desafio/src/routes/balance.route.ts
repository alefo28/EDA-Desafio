import express, { Request, Response } from "express"
import FindAccountUsecase from "../modules/usecase/find_account/find_account.usecase"
import BalanceRepository from "../modules/repository/balance.repository"
import { FindAccountInputDto } from "../modules/usecase/find_account/find_account.usecase.dto"


export const balanceRoute = express.Router()

balanceRoute.get("/:id", async (req:Request, res: Response) => {
    const usecase = new FindAccountUsecase(new BalanceRepository)

    try {
        const input: FindAccountInputDto = {accountID: req.params.id}

        const output  = await usecase.execute(input)

        res.send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})