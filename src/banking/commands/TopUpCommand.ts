import { Command } from "./Command.ts";
import {
    IPaymentStrategy
} from "../strategies/IPaymentStrategy.ts";
import { OperationType } from "../transactions/OperationType.ts";

export class TopUpCommand extends Command
{
    constructor(
        private readonly strategy: IPaymentStrategy,
        private readonly amount: number
    )
    {
        super(OperationType.TOP_UP);
    }

    public execute(): void
    {
        this.strategy.pay(this.amount);
    }
}