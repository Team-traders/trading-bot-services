import { CronJob } from 'cron';
import axios from 'axios';

// Interface EventBus
export interface EventBus {
  publish(event: string, data: any): void;
}

// Interface MarketClient
export interface MarketClient {
  fetchMarketPrices(): Promise<Record<string, number>>;
}

// MockEventBus pour afficher les données publiées
class MockEventBus implements EventBus {
  publish(event: string, data: any): void {
    console.log(`Event published: ${event}`, data);
  }
}

// MarketClient pour MEXC API
class MexcMarketClient implements MarketClient {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = 'https://api.mexc.com/api/v3';
  }

  // Récupérer les prix des tickers
  async fetchMarketPrices(): Promise<Record<string, number>> {
    try {
      const response = await axios.get(`${this.baseUrl}/ticker/price`);
      const prices: Record<string, number> = {};
  
      // Parcourir la réponse pour inclure toutes les paires
      response.data.forEach((item: { symbol: string; price: string }) => {
        prices[item.symbol] = parseFloat(item.price); // Convertir le prix en nombre
      });
  
      return prices; // Retourner toutes les paires et leurs prix
    } catch (error) {
      console.error('Erreur lors de la récupération des prix depuis MEXC:', error);
      throw error;
    }
  }
  

// MarketPriceFetcher pour orchestrer les appels et publier les données
export class MarketPriceFetcher {
  private eventBus: EventBus;
  private marketClient: MarketClient;
  private cronJob: CronJob;

  constructor(eventBus: EventBus, marketClient: MarketClient) {
    this.eventBus = eventBus;
    this.marketClient = marketClient;

    // Cron job qui s'exécute chaque minute
    this.cronJob = new CronJob('*/1 * * * *', this.fetchAndPublishPrices.bind(this));
  }

  private async fetchAndPublishPrices(): Promise<void> {
    try {
      console.log('Fetching market prices...');
      const prices = await this.marketClient.fetchMarketPrices();
      console.log('Fetched prices:', prices);

      // Publier les prix via EventBus
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

// Initialisation des composants
const eventBus = new MockEventBus();
const marketClient = new MexcMarketClient();

// Création du fetcher
const marketPriceFetcher = new MarketPriceFetcher(eventBus, marketClient);

// Démarrage du cron job
marketPriceFetcher.start();
