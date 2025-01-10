import { CreateAlertsOnOrderPlacedEvent } from '../../../src/Contexts/alertService/alerts/application/eventHandlers/CreateAlertsOnOrderPlacedEvent';
import { AlertRepository } from '../../../src/Contexts/alertService/alerts/domain/AlertRepository';
import { OrderPlacedDomainEvent } from '../../../src/Events/OrderPlacedEvent'
import { Alert } from '../../../src/Contexts/alertService/alerts/domain/Alert';

jest.mock('../../../src/Contexts/alertService/alerts/domain/AlertRepository');

describe('CreateAlertsOnOrderPlacedEvent', () => {
  let alertRepositoryMock: jest.Mocked<AlertRepository>;
  let createAlertsOnOrderPlacedEvent: CreateAlertsOnOrderPlacedEvent;

  beforeEach(() => {
    alertRepositoryMock = {
      saveAll: jest.fn(),
    } as unknown as jest.Mocked<AlertRepository>;

    createAlertsOnOrderPlacedEvent = new CreateAlertsOnOrderPlacedEvent(alertRepositoryMock);
  });

  it('should create and save three alerts for the given OrderPlacedDomainEvent', async () => {
    const orderPlacedEvent: OrderPlacedDomainEvent = {
      orderId: '60d5ec59e13e3c76dce2f3c7',
      entryPrice: 100,
      stopLoss: 90,
      takeProfit: 110,
      symbol: 'BTC/USD',
    } as OrderPlacedDomainEvent;

    await createAlertsOnOrderPlacedEvent.on(orderPlacedEvent);

    expect(alertRepositoryMock.saveAll).toHaveBeenCalledTimes(1);

    const savedAlerts = alertRepositoryMock.saveAll.mock.calls[0][0] as Alert[];

    expect(savedAlerts).toHaveLength(3);

    expect(savedAlerts[0].alertType.value).toBe('ENTRY');
    expect(savedAlerts[0].alertPrice.value).toBe(100);

    expect(savedAlerts[1].alertType.value).toBe('TAKE_PROFIT');
    expect(savedAlerts[1].alertPrice.value).toBe(110);
    expect(savedAlerts[1].status.value).toBe('INACTIVE');

    expect(savedAlerts[2].alertType.value).toBe('STOP_LOSS');
    expect(savedAlerts[2].alertPrice.value).toBe(90);
    expect(savedAlerts[2].status.value).toBe('INACTIVE');
  });

  it('should log an error if repository.saveAll fails', async () => {
    const orderPlacedEvent: OrderPlacedDomainEvent = {
      orderId: '12345',
      entryPrice: 100,
      stopLoss: 90,
      takeProfit: 110,
      symbol: 'BTC/USD',
    } as OrderPlacedDomainEvent;

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    alertRepositoryMock.saveAll.mockRejectedValue(new Error('Database error'));

    await createAlertsOnOrderPlacedEvent.on(orderPlacedEvent);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error creating alerts for order 12345:',
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});
