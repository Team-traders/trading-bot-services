import { ValueObject } from './ValueObject';

export abstract class NumberValueObject extends ValueObject<number> {
  isBiggerThan(other: NumberValueObject): boolean {
    return this.value > other.value;
  }

  isSmallerThan(other: NumberValueObject): boolean {
    return this.value < other.value;
  }

  isEqualTo(other: NumberValueObject): boolean {
    return this.value === other.value;
  }

  isGreaterThanOrEqualTo(other: NumberValueObject): boolean {
    return this.value >= other.value;
  }

  isLessThanOrEqualTo(other: NumberValueObject): boolean {
    return this.value <= other.value;
  }

  add(other: NumberValueObject): NumberValueObject {
    return new (this.constructor as any)(this.value + other.value);
  }

  subtract(other: NumberValueObject): NumberValueObject {
    return new (this.constructor as any)(this.value - other.value);
  }

  multiply(other: NumberValueObject): NumberValueObject {
    return new (this.constructor as any)(this.value * other.value);
  }

  divide(other: NumberValueObject): NumberValueObject {
    if (other.value === 0) {
      throw new Error('Division by zero is not allowed.');
    }
    return new (this.constructor as any)(this.value / other.value);
  }
}
