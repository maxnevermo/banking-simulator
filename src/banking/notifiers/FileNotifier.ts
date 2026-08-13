import { INotifier } from "./INotifier.ts";
import {
    generateTransactionCompletedMessage
} from "./NotifierUtilities.ts";
import { ITransaction } from "../states/TransactionStates.ts";

export class FileNotifier implements INotifier
{
    public async notify(transaction: ITransaction)
    {
        await fetch("http://localhost:5000/save-to-file", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: generateTransactionCompletedMessage(transaction)
            })
        });
    }
}