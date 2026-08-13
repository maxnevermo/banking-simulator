import { TransactionHandler } from "./TransactionHandler.ts";
import { ITransactionContext } from "./ITransactionContext.ts";
import { HandlerResult } from "./HandleResult.ts";
import { OperationType } from "../transactions/OperationType.ts";
import { AccountType } from "../account/AccountType.ts";

export class OperationAllowedHandler extends TransactionHandler
{
    protected handleCurrent(context: ITransactionContext): HandlerResult
    {

        const isWithdrawOperationIncorrect = context.operationType === OperationType.WITHDRAW && context.sourceAccount?.type === AccountType.CASH;
        const isTopUpOperationIncorrect = context.operationType === OperationType.TOP_UP && context.sourceAccount?.type === AccountType.CARD;

        if (isWithdrawOperationIncorrect || isTopUpOperationIncorrect)
        {
            return HandlerResult.failure("This operation is not allowed for selected account type");
        }

        return HandlerResult.success();
    }
}