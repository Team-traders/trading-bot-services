import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { StringValueObject } from '../../../../Shared/domain/value-object/StringValueObject';
import { ValueObject } from '../../../../Shared/domain/value-object/ValueObject';

export class AlertId extends Uuid {}
export class LinkedOrderId extends Uuid {}
export class Symbol extends StringValueObject {}
export class AlertTitle extends StringValueObject {}
export class AlertMessage extends StringValueObject {}
export class AlertPrice extends ValueObject<number> {}
export class AlertDate extends ValueObject<Date> {}
