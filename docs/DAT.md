# Overview of the projet and the architecture
the following project is a trading bot that allows its users to automate trades, manage positions and to pass complex orders using a simple interface

# Architecture
![architecture of the app](./archi.png "Title")
## 1. Pricing Service
### Role:
- The Pricing Service is responsible for fetching real-time price data from external price aggregator APIs (e.g., CoinMarketCap, CoinGecko) at regular intervals (using a cron job).
- It doesn't perform any business logic related to trade strategy but merely provides the updated price information to downstream services.
### Events Published:
- ```PriceUpdateEvent```: Contains the latest price for an asset, fetched from the external API.
### Event Example:
```json
{
  "eventType": "PriceUpdateEvent",
  "symbol": "BTC",
  "price": 60000,
  "timestamp": "2024-10-08T12:34:56Z"
}
```
### Events Consumed:
- None

## 2. Alert Service
### Role:
- The Alert Service listens to the PriceUpdateEvent published by the Pricing Service and evaluates predefined conditions like:
    - Entry price
    - Stop-loss
    - Take-profit
- If a condition is met, it triggers an alert by publishing the appropriate event (e.g., for take-profit or stop-loss conditions).
### Events Published:
- ```AlertTriggeredEvent```: Contains details of the alert triggered (entry, stop-loss, or take-profit).
### Event Example:
```json
{
  "eventType": "AlertTriggeredEvent",
  "symbol": "BTC",
  "alertType": "TAKE_PROFIT",
  "alertPrice": 64000,
  "timestamp": "2024-10-08T13:00:00Z"
}
```
### Events Consumed:
- ```PriceUpdateEvent```: Listens for price updates to determine if any alerts should be triggered.

## 3. Strategy Service
### Role:
- The Strategy Service listens for events related to price changes and alerts, and it is responsible for determining when to take action based on predefined strategies.
- If a trading condition is met (e.g., the entry price is hit), it triggers a trade by publishing a TradeSignalEvent.
- This service manages complex strategies like multi-take-profits and multi-stop-losses.
### Events Published:
- ```TradeSignalEvent```: Contains the information required to execute a trade (e.g., buy/sell action, entry price, stop-loss, take-profit).
### Event Example:
```json
{
  "eventType": "TradeSignalEvent",
  "symbol": "BTC",
  "action": "BUY",
  "entryPrice": 60000,
  "stopLoss": 58000,
  "takeProfit": 64000,
  "tradeAmount": 0.5,
  "strategyId": "12345"
}
```
### Events Consumed:
- ```AlertTriggeredEvent```: Listens for alerts from the Alert Service to decide when to execute trades based on the strategy.
- ```TradeExecutedEvent```: Listens for the execution of trades to adjust the strategy or mark it as complete.

## 4. Trade Execution Service
### Role:
- The Trade Execution Service listens for trade signals (e.g., buy/sell orders) and places those orders with the broker’s API (e.g., MEXC).
- After the broker confirms the trade (either success or failure), the Trade Execution Service publishes a ```TradeExecutedEvent```.
### Events Published:
- ```TradeExecutedEvent```: Contains the result of the trade execution (e.g., success/failure, execution price, filled amount).
### Event Example:
```json
{
  "eventType": "TradeExecutedEvent",
  "symbol": "BTC",
  "executionPrice": 60000,
  "filledAmount": 0.5,
  "status": "FILLED",
  "strategyId": "12345",
  "tradeId": "67890",
  "timestamp": "2024-10-08T12:45:00Z"
}
```
### Events Consumed:
- ```TradeSignalEvent```: Listens for trade signals from the Strategy Service to place trades on the broker’s platform.

## 5. Notification Service
### Role:
- The Notification Service is responsible for sending user notifications (e.g., via email) based on events happening in the system.
- It listens to both alerts (from the Alert Service) and trade execution results (from the Trade Execution Service) to notify the user when important events occur (e.g., an alert is triggered or a trade is completed).
### Events Published:
- None (This service doesn't publish events, but rather sends notifications directly).
### Event Example:
```json
//no events
```
### Events Consumed:
- ```AlertTriggeredEvent```: Listens to alerts and notifies the user when an alert (e.g., take-profit, stop-loss) is triggered.
- ```TradeExecutedEvent```: Listens for trade executions to notify the user whether the trade was successful or failed.

# Event Orchestration Summary

- PriceUpdateEvent:
    - Published by: Pricing Service
    - Consumed by: Alert Service

- AlertTriggeredEvent:
    - Published by: Alert Service
    - Consumed by: Strategy Service, Notification Service

- TradeSignalEvent:
    - Published by: Strategy Service
    - Consumed by: Trade Execution Service

- TradeExecutedEvent:
    - Published by: Trade Execution Service
    - Consumed by: Strategy Service, Notification Service