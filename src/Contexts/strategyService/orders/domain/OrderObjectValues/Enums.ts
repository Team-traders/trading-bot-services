import { EnumValueObject } from '../../../../Shared/domain/value-object/EnumValueObject';
import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError';

export type OrderStatusEnum = 'ACTIVE' | 'CLOSED';

export class OrderStatus extends EnumValueObject<OrderStatusEnum> {
  constructor(value: OrderStatusEnum) {
    super(value, ['ACTIVE', 'CLOSED']);
  }
  

  protected throwErrorForInvalidValue(value: string): void {
    throw new InvalidArgumentError(`<${value}> is not a valid order status`);
  }
}
