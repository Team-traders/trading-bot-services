import { CronJob } from 'cron';

export interface EventBus {
  publish(event: string, data: any): void;
}

export interface MarketClient {
  fetchMarketPrices(): Promise<Record<string, number>>;
}

class MockEventBus implements EventBus {
    publish(event: string, data: any): void {
      console.log(`Event published: ${event}`, data);
    }
  }
  
class MockMarketClient implements MarketClient {
    async fetchMarketPrices(): Promise<Record<string, number>> {
      // Simulate fetching prices
      return { BTC: 50000, ETH: 4000 };
    }
  }
  

export class MarketPriceFetcher {
  private eventBus: EventBus;
  private marketClient: MarketClient;
  private cronJob: CronJob;

  constructor(eventBus: EventBus, marketClient: MarketClient) {
    this.eventBus = eventBus;
    this.marketClient = marketClient;

    // Initialize the cron job to run every minute
    this.cronJob = new CronJob('*/1 * * * *', this.fetchAndPublishPrices.bind(this));
  }
  private async fetchAndPublishPrices(): Promise<void> {
    try {
      console.log('Fetching market prices...');
      const prices = await this.marketClient.fetchMarketPrices();
      console.log('Fetched prices:', prices);

      // Publish the prices to the EventBus
      this.eventBus.publish('marketPricesFetched', prices);
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


const eventBus = new MockEventBus();
const marketClient = new MockMarketClient();

// Create the market price fetcher
const marketPriceFetcher = new MarketPriceFetcher(eventBus, marketClient);

// Start the cron job
marketPriceFetcher.start();

