import { TransactionHandler } from "./TransactionHandler.ts";
import { ITransactionContext } from "./ITransactionContext.ts";
import { HandlerResult } from "./HandleResult.ts";
import { AccountType } from "../account/AccountType.ts";

const FEE_SHARE = 0.01;
const MIN_FEE = 5;

export class FeeCalculationHandler extends TransactionHandler
{
    protected handleCurrent(context: ITransactionContext): HandlerResult
    {
        context.fee = 0;

        if (context.sourceAccount?.type === AccountType.CARD)
        {
            context.fee = context.amount * FEE_SHARE + MIN_FEE;
        }

        return HandlerResult.success();
    }
}