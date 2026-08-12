import { OperationType } from "../transactions/OperationType.ts";
import { IAccount } from "../account/IAccount.ts";
import {
    ITransactionStateMachine
} from "../states/TransactionStates.ts";

export interface ITransactionContext
{
    transaction: ITransactionStateMachine;
    amount: number;
    operationType: OperationType;
    sourceAccount?: IAccount;
    targetAccount?: IAccount;
    recipientId?: string;
    fee?: number;
}