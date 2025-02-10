import { Options, Channel, connect, Connection } from "amqplib";

export class Rabbitmq {

    private connection!: Connection;
    public channel!: Channel;

    constructor(private uri: string) {}

    async start(): Promise<void> {
        this.connection = await connect(this.uri);
        this.channel = await this.connection.createChannel();
    }

    async publisheInQueue(queue: string,message: string){
        await this.assertQueue(queue);
        return this.channel.sendToQueue(queue,Buffer.from(message));
    }

    async assertQueue(queue: string, options: Options.AssertQueue = {durable: true}):  Promise<void>{
        await this.channel.assertQueue(queue,options);
    }

    async consumeQueue(queue: string, onMessage : (msg: any) => void) {
        await this.assertQueue(queue);
        await this.channel.consume(queue,onMessage,{noAck: false});
    }
}