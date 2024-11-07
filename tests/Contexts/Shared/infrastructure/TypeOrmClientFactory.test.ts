import { DataSource } from 'typeorm';
import { TypeOrmClientFactory } from '../../../../src/Contexts/Shared/infrastructure/persistence/typeorm/TypeOrmClientFactory';
import util from 'util';

describe('TypeOrmClientFactory', () => {
  const factory = TypeOrmClientFactory;
  let client: DataSource | undefined;

  beforeEach(async () => {
    client = await factory.createClient('test', {
      host: 'localhost',
      port: 5432,
      username: 'codely',
      password: 'codely',
      database: 'mooc-backend-dev'
    });
  });

  afterEach(async () => {
    await client?.destroy();
  });

  it('returns a client if it already exists', async () => {
    const newClient = await factory.createClient('test', {
      host: 'localhost',
      port: 5432,
      username: 'codely',
      password: 'codely',
      database: 'mooc-backend-dev'
    });

    expect(util.inspect(newClient, { depth: null })).toEqual(util.inspect(client, { depth: null }));
    expect(newClient?.isInitialized).toBeTruthy();
  });
});
