import { v4 as uuidv4 } from 'uuid';
import { AsyncLocalStorage } from 'node:async_hooks';

export class CorrelationIdService {
  private readonly asyncLocalStorage = new AsyncLocalStorage<
    Map<string, string>
  >();

  generateCorrelationId(): string {
    return uuidv4();
  }

  setCorrelationId(correlationId: string): void {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      store.set('correlationId', correlationId);
    }
  }

  getCorrelationId(): string | undefined {
    const store = this.asyncLocalStorage.getStore();
    return store?.get('correlationId');
  }

  // Run code with correlation ID context (for HTTP requests, direct calls)
  runWithCorrelationId<T>(correlationId: string, callback: () => T): T {
    const store = new Map<string, string>();
    store.set('correlationId', correlationId);
    return this.asyncLocalStorage.run(store, callback);
  }

  // Set correlation ID and return a function to run async operations
  // This is crucial for event-driven scenarios
  setCorrelationIdForAsync(correlationId: string): void {
    const store = new Map<string, string>();
    store.set('correlationId', correlationId);
    this.asyncLocalStorage.enterWith(store);
  }
}
