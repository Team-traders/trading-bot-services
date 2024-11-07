import { DataSource } from 'typeorm';
import { TypeOrmConfig } from './TypeOrmConfig';

export class TypeOrmClientFactory {
  private static clients: Map<string, DataSource> = new Map();

  static async createClient(contextName: string, config: TypeOrmConfig): Promise<DataSource | undefined> {
    // Check if a client already exists and is initialized
    const existingClient = this.clients.get(contextName);
    if (existingClient && existingClient.isInitialized) {
      return existingClient;
    }

    // If no initialized client exists, create a new one
    const AppDataSource = new DataSource({
      name: contextName,
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: [__dirname + '/../../../../**/**/infrastructure/persistence/typeorm/*{.js,.ts}'],
      synchronize: true,
      logging: true
    });

    const newClient = await AppDataSource.initialize();
    this.clients.set(contextName, newClient); // Store the new client for reuse
    return newClient;
  }
}
