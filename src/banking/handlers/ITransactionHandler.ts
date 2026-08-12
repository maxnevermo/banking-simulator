import { ITransactionContext } from "./ITransactionContext.ts";
import { HandlerResult } from "./HandleResult.ts";

export interface ITransactionHandler
{
    setNext(handler: ITransactionHandler): ITransactionHandler;
    handle(context: ITransactionContext): HandlerResult;
}