import { Consumer, Kafka } from "kafkajs";

export default class KafkaEvent {
  private consumer: Consumer;

  constructor(kafka: Kafka, groupId: string) {
    this.consumer = kafka.consumer({ groupId: groupId });
  }

  async connect(): Promise<void> {
    await this.consumer.connect();
    console.log("Kafka Connect");
  }

  async disconnet(): Promise<void> {
    await this.consumer.disconnect();
  }

  async subscribe(
    topicName: string,
    callback: (payload: any) => void
  ): Promise<void> {
    this.consumer
      .subscribe({ topic: topicName, fromBeginning: false })
      .then(() => {
        this.consumer.run({
          eachMessage: async ({ topic, partition, message }) => {
            if (topic == topicName && message.value) {
              const payload = JSON.parse(message.value.toString());
              callback(payload);
            }
          },
        });
      });
  }
}
