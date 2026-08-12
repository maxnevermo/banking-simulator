import { INotifier } from "./INotifier.ts";
import {
    generateTransactionCompletedMessage
} from "./NotifierUtilities.ts";
import { ITransaction } from "../states/TransactionStates.ts";

export class FileNotifier implements INotifier
{
    async notify(transaction: ITransaction)
    {
        await fetch("https://localhost:5000/save-to-file", {
            method: "POST",
            body: JSON.stringify({
                message: generateTransactionCompletedMessage(transaction)
            })
        });
    }
}