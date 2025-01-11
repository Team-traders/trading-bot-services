import { Command } from '../../../../Shared/domain/Command';

type DeleteOrderCommandParams = {
  id: string;
};

export class DeleteOrderCommand extends Command {
  readonly id: string;

  constructor({ id }: DeleteOrderCommandParams) {
    super();
    this.id = id;
  }
}
