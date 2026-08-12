import { Command } from "./Command.ts";
import {
    IPaymentRefillableStrategy
} from "../strategies/IPaymentStrategy.ts";
import { OperationType } from "../transactions/OperationType.ts";

export class WithdrawCommand extends Command
{
    constructor(
        private readonly strategy: IPaymentRefillableStrategy,
        private readonly amount: number
    )
    {
        super(OperationType.WITHDRAW);
    }

    execute(): void
    {
        this.strategy.withdraw(this.amount);
    }

}