import { PriceUpdateData } from "../../../Events/PriceUpdateEvent";

export interface MarketClient {
  fetchMarketPrices(): Promise<PriceUpdateData[]>;
}
