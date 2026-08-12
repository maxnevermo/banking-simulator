import {
    InitiatedTransactionState,
    ITransactionStateMachine,
    TransactionState
} from "../states/TransactionStates.ts";
import {
    TransactionStatus
} from "../states/TransactionStatus.ts";

export class Transaction implements ITransactionStateMachine
{
    private state: TransactionState;
    private failureReason?: string;

    constructor()
    {
        this.state = new InitiatedTransactionState();
    }

    public setFailureReason(reason: string): void
    {
        this.failureReason = reason;
    }

    public setState(state: TransactionState): void
    {
        this.state = state;
    }

    public moveNext(): void
    {
        this.state.setNextState(this);
    }

    public fail(reason: string): void
    {
        this.state.setFailure(this, reason);
    }

    public getStatus(): TransactionStatus
    {
        return this.state.getStatus();
    }

    public getFailureReason(): string | undefined
    {
        return this.failureReason;
    }
}