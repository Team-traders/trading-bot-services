import { EnumValueObject } from '../../../../Shared/domain/value-object/EnumValueObject';

export type AlertTypeEnum = 'TAKE_PROFIT' | 'STOP_LOSS' | 'NOTIFICATION';
export type TriggerConditionEnum = 'GTE' | 'LTE';
export type AlertStatusEnum = 'ACTIVE' | 'TRIGGERED' | 'INACTIVE';

export class AlertType extends EnumValueObject<AlertTypeEnum> {
  constructor(value: AlertTypeEnum) {
    super(value, ['TAKE_PROFIT', 'STOP_LOSS', 'NOTIFICATION']);
  }

  protected throwErrorForInvalidValue(value: AlertTypeEnum): void {
    throw new Error(`<AlertType> does not allow the value <${value}>`);
  }
}

export class TriggerCondition extends EnumValueObject<TriggerConditionEnum> {
  constructor(value: TriggerConditionEnum) {
    super(value, ['GTE', 'LTE']);
  }

  protected throwErrorForInvalidValue(value: TriggerConditionEnum): void {
    throw new Error(`<TriggerCondition> does not allow the value <${value}>`);
  }
}

export class AlertStatus extends EnumValueObject<AlertStatusEnum> {
  constructor(value: AlertStatusEnum) {
    super(value, ['ACTIVE', 'TRIGGERED', 'INACTIVE']);
  }

  protected throwErrorForInvalidValue(value: AlertStatusEnum): void {
    throw new Error(`<AlertStatus> does not allow the value <${value}>`);
  }
}
