import {
    TransactionStatus
} from "../states/TransactionStatus.ts";
import { ITransaction } from "../states/TransactionStates.ts";

export function generateTransactionCompletedMessage(transaction: ITransaction): string
{
    const isResultSuccessful = transaction.getStatus() === TransactionStatus.SUCCESS;

    if (isResultSuccessful)
    {
        return `Transaction successfully completed`;
    }
    else
    {
        return `Transaction failed: ${transaction.getFailureReason() ?? "Unknown reason"}`;
    }
}