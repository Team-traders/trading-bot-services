import { Uuid } from './value-object/Uuid';

export abstract class DomainEvent {
  static EVENT_NAME: string;
  static fromPrimitives: (params: {
    aggregateId: string;
    eventId: string;
    occurredOn: Date;
    metadata?: Record<string, unknown>;
    attributes: DomainEventAttributes;
  }) => DomainEvent;

  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly metadata?: Record<string, unknown>;
  readonly eventName: string;

  constructor(params: {
    eventName: string;
    aggregateId?: string;
    eventId?: string;
    occurredOn?: Date;
    metadata?: Record<string, unknown>;
  }) {
    const { aggregateId, eventName, eventId, occurredOn, metadata } = params;
    this.aggregateId = aggregateId || Uuid.random().value;
    this.eventId = eventId || Uuid.random().value;
    this.occurredOn = occurredOn || new Date();
    this.eventName = eventName;
    this.metadata = metadata;
  }

  abstract toPrimitives(): DomainEventAttributes;
}

export type DomainEventClass = {
  EVENT_NAME: string;
  fromPrimitives(params: {
    aggregateId: string;
    eventId: string;
    occurredOn: Date;
    attributes: DomainEventAttributes;
    metadata: Record<string, unknown>;
  }): DomainEvent;
};

type DomainEventAttributes = any;
