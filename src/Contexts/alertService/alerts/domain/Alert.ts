import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import {
  AlertType,
  TriggerCondition,
  AlertStatus,
} from './AlertValueObjects/Enums';
import {
  AlertDate,
  AlertId,
  AlertMessage,
  AlertPrice,
  AlertTitle,
  LinkedOrderId,
  Symbol,
} from './AlertValueObjects/ValueObjects';

export class Alert extends AggregateRoot {
  readonly id: AlertId;
  readonly symbol: Symbol;
  readonly linkedOrderId: LinkedOrderId | null;
  readonly alertType: AlertType;
  readonly alertPrice: AlertPrice;
  readonly triggerCondition: TriggerCondition;
  readonly status: AlertStatus;
  readonly title: AlertTitle;
  readonly message: AlertMessage;
  readonly createdAt: AlertDate;
  readonly updatedAt: AlertDate;

  constructor(
    id: AlertId,
    symbol: Symbol,
    linkedOrderId: LinkedOrderId | null,
    alertType: AlertType,
    alertPrice: AlertPrice,
    triggerCondition: TriggerCondition,
    status: AlertStatus,
    title: AlertTitle,
    message: AlertMessage,
    createdAt: AlertDate,
    updatedAt: AlertDate,
  ) {
    super();
    this.id = id;
    this.symbol = symbol;
    this.linkedOrderId = linkedOrderId;
    this.alertType = alertType;
    this.alertPrice = alertPrice;
    this.triggerCondition = triggerCondition;
    this.status = status;
    this.title = title;
    this.message = message;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(
    symbol: Symbol,
    linkedOrderId: LinkedOrderId | null,
    alertType: AlertType,
    alertPrice: AlertPrice,
    triggerCondition: TriggerCondition,
    title: AlertTitle,
    message: AlertMessage,
    status: AlertStatus = new AlertStatus('ACTIVE'),
    createdAt: AlertDate = new AlertDate(new Date(Date.now())),
    updatedAt: AlertDate = new AlertDate(new Date(Date.now())),
  ): Alert {
    const id = AlertId.random();

    return new Alert(
      id,
      symbol,
      linkedOrderId,
      alertType,
      alertPrice,
      triggerCondition,
      status,
      title,
      message,
      createdAt,
      updatedAt,
    );
  }

  static fromPrimitives(plainData: {
    _id: string;
    symbol: string;
    linkedOrderId: string | null;
    alertType: 'TAKE_PROFIT' | 'STOP_LOSS' | 'NOTIFICATION';
    alertPrice: number;
    triggerCondition: 'GTE' | 'LTE';
    status: 'ACTIVE' | 'TRIGGERED' | 'INACTIVE';
    title: string;
    message: string;
    createdAt: string;
    updatedAt: string;
  }): Alert {
    return new Alert(
      new AlertId(plainData._id),
      new Symbol(plainData.symbol),
      plainData.linkedOrderId
        ? new LinkedOrderId(plainData.linkedOrderId)
        : null,
      new AlertType(plainData.alertType),
      new AlertPrice(plainData.alertPrice),
      new TriggerCondition(plainData.triggerCondition),
      new AlertStatus(plainData.status),
      new AlertTitle(plainData.title),
      new AlertMessage(plainData.message),
      new AlertDate(new Date(plainData.createdAt)),
      new AlertDate(new Date(plainData.updatedAt)),
    );
  }

  toPrimitives() {
    return {
      _id: this.id.value,
      symbol: this.symbol.value,
      linkedOrderId: this.linkedOrderId?.value || null,
      alertType: this.alertType.value,
      alertPrice: this.alertPrice.value,
      triggerCondition: this.triggerCondition.value,
      status: this.status.value,
      title: this.title.value,
      message: this.message.value,
      createdAt: this.createdAt.value.toISOString(),
      updatedAt: this.updatedAt.value.toISOString(),
    };
  }
}
