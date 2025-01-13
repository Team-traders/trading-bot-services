export interface MexcTradeResponseData {
    symbol: string;
    fills: { price: number }[];
    executedQty: number;
    status: string;
    orderId: string;
    transactTime: number;
}