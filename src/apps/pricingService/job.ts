import { CronJob } from 'cron';
import axios from 'axios';
import { EventBus } from '../../Contexts/Shared/domain/EventBus';
import { PriceUpdateData, PriceUpdateDomainEvent } from '../../Events/PriceUpdateEvent';
import container from './dependency-injection';


export interface MarketClient {
  fetchMarketPrices(): Promise<PriceUpdateData[]>;
}


class MexcMarketClient implements MarketClient {
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

export class MarketPriceFetcher {
  private cronJob: CronJob;

  constructor(
    private eventBus: EventBus,
    private marketClient: MarketClient
  ) {
    this.cronJob = new CronJob('*/1 * * * *', this.fetchAndPublishPrices.bind(this));
  }

  private async fetchAndPublishPrices(): Promise<void> {
    try {
      console.log('Fetching market prices...');
      const prices = await this.marketClient.fetchMarketPrices();
      console.log('Fetched prices:', prices);
      await this.eventBus.publish([new PriceUpdateDomainEvent({ data: prices })]);

    } catch (error) {
      console.error('Error fetching market prices:', error);
    }
  }

  public start(): void {
    console.log('Starting the market price fetcher...');
    this.cronJob.start();
  }

  public stop(): void {
    console.log('Stopping the market price fetcher...');
    this.cronJob.stop();
  }
}

const eventBus = container.get('Mechoui3.Shared.domain.EventBus') as EventBus;
const marketClient = new MexcMarketClient();
const marketPriceFetcher = new MarketPriceFetcher(eventBus, marketClient);

marketPriceFetcher.start();
