
# Trading Bot Project

This project is a **trading bot** that allows users to automate trades, manage positions, and place complex orders through a simple interface. The bot integrates with multiple services to gather real-time price data, trigger alerts, execute trades, and notify users about important events. 

The project is built following the **Domain-Driven Design (DDD)** paradigm, which helps structure the application into distinct domains, each responsible for a specific business functionality.

## Overview

The bot is designed to work seamlessly with external price aggregators and brokers, enabling the user to automate trading strategies. The core services involved in the system include:

- **Pricing Service**: Fetches real-time price data.
- **Alert Service**: Triggers alerts based on predefined price conditions (entry, stop-loss, take-profit).
- **Strategy Service**: Defines and executes trading strategies based on price data and alerts.
- **Trade Execution Service**: Executes trades through the broker's API.
- **Notification Service**: Sends user notifications based on alerts and trade executions.

## Architecture

For a detailed explanation of the architecture and how the services interact, please refer to the [architecture document](docs/DAT.md) and the [architecture diagram](docs/archi.png).

The project follows an event-driven architecture, where each service listens to and publishes events to coordinate tasks such as price updates, alert triggers, trade execution, and user notifications. The overall design is influenced by the principles of **Domain-Driven Design (DDD)**, with clear boundaries between the different domains (e.g., pricing, alerting, trade execution).

## How to Run the Project

To start the project, you can use the `run_project.sh` script located in the `/scripts` folder. This will launch all necessary services for the trading bot to work.

### Run the Project

```bash
cd /scripts
./run_project.sh
```

This will initialize the bot and start fetching price data, managing alerts, executing trades, and sending notifications.

### Stop the Project

To stop the project, simply run the `stop_project.sh` script, which is also located in the `/scripts` folder.

```bash
cd /scripts
./stop_project.sh
```

This will gracefully stop all the services involved in the bot.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
