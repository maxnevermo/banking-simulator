import { TransactionHandler } from "./TransactionHandler.ts";
import { ITransactionContext } from "./ITransactionContext.ts";
import { HandlerResult } from "./HandleResult.ts";
import { FeeCalculator } from "../transactions/FeeCalculator.ts";

export class FeeCalculationHandler extends TransactionHandler
{
    protected handleCurrent(context: ITransactionContext): HandlerResult
    {
        context.fee = context.sourceAccount
            ? FeeCalculator.calculateFor(context.sourceAccount, context.amount)
            : 0;

        return HandlerResult.success();
    }
}