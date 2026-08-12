import { TransactionHandler } from "./TransactionHandler.ts";
import { ITransactionContext } from "./ITransactionContext.ts";
import { HandlerResult } from "./HandleResult.ts";

export class FundsAvailableHandler extends TransactionHandler
{
    protected handleCurrent(context: ITransactionContext): HandlerResult
    {
        const amountToSpend = context.amount + (context.fee ?? 0);

        if (!context.sourceAccount?.canSpend(amountToSpend))
        {
            return HandlerResult.failure("Insufficient funds in the account");
        }

        return HandlerResult.success();
    }
}