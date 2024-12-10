import { NumberValueObject } from '../../../../Shared/domain/value-object/NumberValueObject';
import { StringValueObject } from '../../../../Shared/domain/value-object/StringValueObject';

export class Symbol extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidSymbol(value);
  }

  private ensureIsValidSymbol(value: string): void {
    if (!value || typeof value !== 'string') {
      throw new Error('Invalid Symbol: Must be a non-empty string');
    }
  }
}

export class OrderPrice extends NumberValueObject {
  constructor(value: number) {
    super(value);
    this.ensureIsPositive(value);
  }

  private ensureIsPositive(value: number): void {
    if (value <= 0) {
      throw new Error('Invalid OrderPrice: Must be greater than 0');
    }
  }
}

export class TradeAmount extends NumberValueObject {
  constructor(value: number) {
    super(value);
    this.ensureIsPositive(value);
  }

  private ensureIsPositive(value: number): void {
    if (value <= 0) {
      throw new Error('Invalid TradeAmount: Must be greater than 0');
    }
  }
}

export class EntryPrice extends OrderPrice {
  constructor(value: number) {
    super(value); // Same validation as OrderPrice
  }
}

export class StopLoss extends OrderPrice {
  constructor(value: number) {
    super(value); // Same validation as OrderPrice
  }
}

export class TakeProfit extends OrderPrice {
  constructor(value: number) {
    super(value); // Same validation as OrderPrice
  }
}

  

