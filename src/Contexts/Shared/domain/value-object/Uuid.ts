import { ObjectId } from 'mongodb';
import { InvalidArgumentError } from './InvalidArgumentError';
import { ValueObject } from './ValueObject';

export class Uuid extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValidMongoId(value);
  }

  static random(): Uuid {
    return new Uuid(new ObjectId().toHexString());
  }

  private ensureIsValidMongoId(id: string): void {
    if (!ObjectId.isValid(id)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
    }
  }
}
