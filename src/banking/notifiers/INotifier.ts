import { ITransaction } from "../states/TransactionStates.ts";

export interface INotifier
{
    notify(transaction: ITransaction): void | Promise<void>;
}
