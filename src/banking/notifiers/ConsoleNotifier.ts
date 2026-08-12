import { INotifier } from "./INotifier.ts";
import {
    generateTransactionCompletedMessage
} from "./NotifierUtilities.ts";
import { ITransaction } from "../states/TransactionStates.ts";

export class ConsoleNotifier implements INotifier
{
    notify(transaction: ITransaction): void
    {
        console.log(generateTransactionCompletedMessage(transaction));
    }
}