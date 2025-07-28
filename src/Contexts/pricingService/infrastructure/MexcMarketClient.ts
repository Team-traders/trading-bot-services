import axios from 'axios';
import { PriceUpdateData } from '../../../Contexts/pricingService/domain/PriceUpdateEvent';
import { MarketClient } from '../domain/MarketClient';

export class MexcMarketClient implements MarketClient {
  private readonly baseUrl: string = 'https://api.mexc.com/api/v3';

  async fetchMarketPrices() {
    try {
      const prices: PriceUpdateData[] = [];

      const response = await axios.get(`${this.baseUrl}/ticker/price`);
      if (Array.isArray(response.data)) {
        response.data.forEach((item: { symbol: string; price: string }) => {
          prices.push({
            symbol: item.symbol,
            price: parseFloat(item.price),
          });
        });
      } else {
        console.log('Error fetching prices:', response.data);
      }
      return prices;
    } catch (error) {
      console.error('Error fetching prices:', error);
      throw error;
    }
  }
}
