import { INotifier } from "./INotifier.ts";
import {
    generateTransactionCompletedMessage
} from "./NotifierUtilities.ts";
import { ITransaction } from "../states/TransactionStates.ts";

export class EmailNotifier implements INotifier
{
    async notify(transaction: ITransaction)
    {
        await fetch("https://localhost:5000/send-email", {
            method: "POST",
            body: JSON.stringify({
                email: "maksym.sakh@gmail.com",
                message: generateTransactionCompletedMessage(transaction)
            })
        });
    }
}