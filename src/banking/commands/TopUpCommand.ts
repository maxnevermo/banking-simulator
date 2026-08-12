import { Command } from "./Command.ts";
import {
    IPaymentRefillableStrategy
} from "../strategies/IPaymentStrategy.ts";
import { OperationType } from "../transactions/OperationType.ts";

export class TopUpCommand extends Command
{
    constructor(
        private readonly strategy: IPaymentRefillableStrategy,
        private readonly amount: number
    )
    {
        super(OperationType.TOP_UP);
    }

    execute(): void
    {
        this.strategy.topUp(this.amount);
    }
}