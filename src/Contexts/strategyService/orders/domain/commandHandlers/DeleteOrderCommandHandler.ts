import { ObjectId } from 'bson';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { DeleteOrderCommand } from '../commands/DeleteOrderCommand';
import { OrderRepository } from '../OrderRepository';

export class DeleteOrderCommandHandler
  implements CommandHandler<DeleteOrderCommand>
{
  constructor(private orderRepo: OrderRepository) {}

  subscribedTo(): typeof DeleteOrderCommand {
    return DeleteOrderCommand;
  }

  async handle(command: DeleteOrderCommand): Promise<void> {
    const filter = { _id: new ObjectId(command.id) };
    await this.orderRepo.deleteOne(filter);
  }
}
