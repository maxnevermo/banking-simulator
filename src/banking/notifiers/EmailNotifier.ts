import { INotifier } from "./INotifier.ts";
import {
    generateTransactionCompletedMessage
} from "./NotifierUtilities.ts";
import { ITransaction } from "../states/TransactionStates.ts";

export class EmailNotifier implements INotifier
{
    constructor(private readonly email: string)
    {
    }

    public async notify(transaction: ITransaction)
    {
        await fetch("http://localhost:5000/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                receiver: this.email,
                message: generateTransactionCompletedMessage(transaction)
            })
        });
    }
}