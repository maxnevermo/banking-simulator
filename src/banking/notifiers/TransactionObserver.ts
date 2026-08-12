import { INotifier } from "./INotifier.ts";
import { ITransaction } from "../states/TransactionStates.ts";

export interface ITransactionObserver
{
    notifyAll(transaction: ITransaction): Promise<void>;
    subscribe(notifier: INotifier): void;
    unsubscribe(notifier: INotifier): void;
}

export class TransactionObserver implements ITransactionObserver
{
    private readonly observers: INotifier[] = [];

    subscribe(notifier: INotifier): void
    {
        if (!this.observers.includes(notifier))
        {
            this.observers.push(notifier);
        }
    }

    unsubscribe(notifier: INotifier): void
    {
        const index = this.observers.indexOf(notifier);

        if (index !== -1)
        {
            this.observers.splice(index, 1);
        }
    }

    async notifyAll(transaction: ITransaction): Promise<void>
    {
        await Promise.allSettled(
            this.observers.map((observer) => observer.notify(transaction))
        );
    }
}