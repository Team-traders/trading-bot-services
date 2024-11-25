import { ObjectId } from 'mongodb';

export class UuidMother {
  static random(): string {
    return new ObjectId().toHexString();
  }
}
