export interface EventConsumer {
    consume(queuName : string, callback: (event: any) => Promise<void>) : Promise<void>;
}