import { ITransactionHandler } from "./ITransactionHandler.ts";
import { ITransactionContext } from "./ITransactionContext.ts";
import { HandlerResult } from "./HandleResult.ts";

export abstract class TransactionHandler implements ITransactionHandler
{
    private nextHandler?: ITransactionHandler | null = null;

    public setNext(handler: ITransactionHandler)
    {
        this.nextHandler = handler;

        return handler;
    }

    public handle(context: ITransactionContext): HandlerResult
    {
        const result = this.handleCurrent(context);

        if (!result.success)
        {
            return result;
        }


        if (this.nextHandler)
        {
            context.transaction.moveNext();
            return this.nextHandler.handle(context);
        }

        return HandlerResult.success();
    }

    protected abstract handleCurrent(context: ITransactionContext): HandlerResult;
}