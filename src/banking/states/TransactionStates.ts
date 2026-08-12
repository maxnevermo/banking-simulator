import { TransactionStatus } from "./TransactionStatus.ts";

export interface ITransaction
{
    setFailureReason(reason: string): void;
    getFailureReason(): string | undefined;
    setState(state: TransactionState): void;
    getStatus(): TransactionStatus;
}

export interface ITransactionStateMachine extends ITransaction
{
    moveNext(): void;
    fail(reason: string): void;
}

export abstract class TransactionState
{
    constructor(private readonly currentState: TransactionStatus)
    {
    }

    abstract setNextState(transaction: ITransaction): void;

    setFailure(transaction: ITransaction, reason: string): void
    {
        transaction.setFailureReason(reason);
        transaction.setState(new FailedTransactionState());
    }

    getStatus(): TransactionStatus
    {
        return this.currentState;
    }
}

export class InitiatedTransactionState extends TransactionState
{
    constructor()
    {
        super(TransactionStatus.INITIATED);
    }

    setNextState(transaction: ITransaction): void
    {
        transaction.setState(new ValidatingTransactionState());
    }
}

export class ValidatingTransactionState extends TransactionState
{
    constructor()
    {
        super(TransactionStatus.VALIDATING);
    }

    setNextState(transaction: ITransaction): void
    {
        transaction.setState(new FundsCheckingTransactionState());
    }
}

export class FundsCheckingTransactionState extends TransactionState
{
    constructor()
    {
        super(TransactionStatus.CHECKING_FUNDS);
    }

    setNextState(transaction: ITransaction): void
    {
        transaction.setState(new ProcessingTransactionState());
    }
}

export class ProcessingTransactionState extends TransactionState
{
    constructor()
    {
        super(TransactionStatus.PROCESSING);
    }

    setNextState(transaction: ITransaction): void
    {
        transaction.setState(new SucceededTransactionState());
    }
}

export class SucceededTransactionState extends TransactionState
{
    constructor()
    {
        super(TransactionStatus.SUCCESS);
    }

    setNextState(_transaction: ITransaction): void
    {
    }
}

export class FailedTransactionState extends TransactionState
{
    constructor()
    {
        super(TransactionStatus.FAILED);
    }

    setNextState(_transaction: ITransaction): void
    {
    }
}