import { TradeSignalDomainEvent } from '../../../../../../Events/TradeSignalEvent';
import { TradeExecutedDomainEvent } from '../../../domain/TradeExecutedEvent';
import { BrokerAPI } from '../BrokerAPI';
import { MexcTradeResponseData } from '../../../domain/MexcTradeResponseData';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import crypto from 'crypto';

// Charger les variables d'environnement
import dotenv from 'dotenv';
dotenv.config();

export class MexcBroker implements BrokerAPI {
    private apiKey: string;
    private apiSecret: string;
    private baseUrl: string;

    constructor() {
        this.apiKey = process.env.MEXC_API_KEY || '';
        this.apiSecret = process.env.MEXC_API_SECRET || '';
        this.baseUrl = 'https://api.mexc.com';
    }

    async executeTrade(tradeSignal: TradeSignalDomainEvent): Promise<TradeExecutedDomainEvent> {
        try {
            const symbol = tradeSignal.symbol.replace('/', '');
            const endpoint = '/api/v3/order';
            const url = this.baseUrl + endpoint;
            const params: { symbol: string; side: "BUY" | "SELL"; type: string; quoteOrderQty: number; timestamp: number; signature?: string } = {
                symbol,
                side: tradeSignal.action,
                type: 'MARKET',
                quoteOrderQty: tradeSignal.tradeAmount,
                timestamp: Date.now(),
            };

            // Générer la signature
            const queryString = Object.keys(params).sort().map(key => `${key}=${(params as Record<string, any>)[key]}`).join('&');
            const signature = crypto.createHmac('sha256', this.apiSecret).update(queryString).digest('hex');
            params.signature = signature;

            // Construire l'URL avec les paramètres
            const queryStringWithSignature = Object.keys(params).sort().map(key => `${key}=${(params as Record<string, any>)[key]}`).join('&');
            const urlWithParams = url + '?' + queryStringWithSignature;
            console.log(urlWithParams);

            const options = {
                method: "POST",
                url: `${this.baseUrl}${endpoint}`,
                headers: {
                    'x-mexc-apikey': this.apiKey,
                    'Content-Type': 'application/json'
                },
                redirect: "follow"
            };

            // Envoyer la requête
            const response = await axios.post(urlWithParams, null, options);

            const responseData: MexcTradeResponseData = response.data as MexcTradeResponseData;

            // Implement the logic to parse the response and return the necessary data
            const tradeExecutedEvent: TradeExecutedDomainEvent = new TradeExecutedDomainEvent({
                aggregateId: uuidv4(), // Generate a unique ID for the trade
                symbol: responseData.symbol,
                executionPrice: responseData.fills[0].price,
                filledAmount: responseData.executedQty,
                status: responseData.status,
                tradeId: responseData.orderId,
                timestamp: responseData.transactTime.toString()
            });

            console.log("Trade" + tradeExecutedEvent);

            return tradeExecutedEvent;
        } catch (error) {
            console.error('Error executing trade on MEXC:', error);
            throw new Error('Trade execution failed');
        }
    }
}