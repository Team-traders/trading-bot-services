import { CronJob } from 'cron';
import { PriceUpdateDomainEvent } from './../domain/PriceUpdateEvent';
import { MarketClient } from '../domain/MarketClient';
import { EventBus } from '../../Shared/domain/EventBus';

export class MarketPriceFetcher {
  private cronJob: CronJob;

  constructor(
    private eventBus: EventBus,
    private marketClient: MarketClient,
  ) {
    this.cronJob = new CronJob(
      '*/30 * * * * *',
      this.fetchAndPublishPrices.bind(this),
    );
  }

  private async fetchAndPublishPrices(): Promise<void> {
    try {
      const prices = await this.marketClient.fetchMarketPrices();
      console.log(prices[0]);
      await this.eventBus.publish([
        new PriceUpdateDomainEvent({ data: prices }),
      ]);
      console.log('events emmited');
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
