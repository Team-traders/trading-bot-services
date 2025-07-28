import { PriceUpdateData } from './PriceUpdateEvent';

export interface MarketClient {
  fetchMarketPrices(): Promise<PriceUpdateData[]>;
}
