import dotenv from "dotenv";
import { app } from "./express";
import { Kafka } from "kafkajs";
import KafkaEvent from "../kafka/kafkaEvent";
import FindAccountUsecase from "../modules/usecase/find_account/find_account.usecase";
import BalanceRepository from "../modules/repository/balance.repository";
import UpdateBalanceUsecase from "../modules/usecase/update_balance/update_balance.usecase";
import CreateBalanceUsecase from "../modules/usecase/create_balance/create_balance.usecase";

dotenv.config();
const port: number = Number(process.env.PORT) || 8082;

const kafka = new Kafka({
  clientId: "desafioapp",
  brokers: ["kafka:29092"],
  retry: {
    retries: 10,
    initialRetryTime: 300,
  },
});
const kafkaEvent = new KafkaEvent(kafka, "groupId");

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  kafkaEvent.subscribe("balances", async (payload) => {
    console.log("balance:", payload.Payload);
    const repository = new BalanceRepository();

    const FindUsecase = new FindAccountUsecase(repository);
    const UpdateUsecase = new UpdateBalanceUsecase(repository);
    const CreateUsecase = new CreateBalanceUsecase(repository);

    const balance = payload.Payload;


    async function upsertAccount(accountID: string, balanceValue: number) {
      const account = await FindUsecase.execute({ accountID });
    
      if (account) {
        await UpdateUsecase.execute({ accountID, balance: balanceValue });
      } else {
        await CreateUsecase.execute({ accountID, balance: balanceValue });
      }
    }

    await Promise.all([
      upsertAccount(balance.account_id_from, balance.balance_account_id_from),
      upsertAccount(balance.account_id_to, balance.balance_account_id_to),
    ]);
  });
});
