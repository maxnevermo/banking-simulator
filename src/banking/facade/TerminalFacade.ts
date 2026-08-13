import { Transaction } from "../transactions/Transaction.ts";
import { Command } from "../commands/Command.ts";
import { WithdrawCommand } from "../commands/WithdrawCommand.ts";
import {
    ITransactionContext
} from "../handlers/ITransactionContext.ts";
import {
    ITransactionHandler
} from "../handlers/ITransactionHandler.ts";
import {
    IPaymentStrategy
} from "../strategies/IPaymentStrategy.ts";
import { TopUpCommand } from "../commands/TopUpCommand.ts";
import { PayLoanCommand } from "../commands/PayLoanCommand.ts";
import {
    PayUtilitiesCommand
} from "../commands/PayUtilitiesCommand.ts";


export class TerminalFacade
{
    constructor(
        private readonly handlers: ITransactionHandler)
    {
    }

    async withdraw(amount: number, strategy: IPaymentStrategy): Promise<Transaction>
    {
        return this.runCommand(new WithdrawCommand(strategy, amount), amount, strategy);
    }

    async topUp(amount: number, strategy: IPaymentStrategy): Promise<Transaction>
    {
        return this.runCommand(new TopUpCommand(strategy, amount), amount, strategy);
    }

    async payLoan(amount: number, strategy: IPaymentStrategy): Promise<Transaction>
    {
        return this.runCommand(new PayLoanCommand(strategy, amount), amount, strategy);
    }

    async payUtilities(amount: number, strategy: IPaymentStrategy): Promise<Transaction>
    {
        return this.runCommand(new PayUtilitiesCommand(strategy, amount), amount, strategy);
    }

    private async executeTransaction(transaction: Transaction, command: Command, context: ITransactionContext): Promise<Transaction>
    {
        transaction.moveNext();

        const validationResult = this.handlers.handle(context);

        if (!validationResult.success)
        {
            transaction.fail(validationResult.message);

            return transaction;
        }

        try
        {
            command.execute();
            transaction.moveNext();
        } catch (error)
        {
            transaction.fail(
                error instanceof Error
                    ? error.message
                    : "Unknown transaction error"
            );

            return transaction;
        }

        return transaction;
    }

    private async runCommand(command: Command, amount: number, strategy: IPaymentStrategy): Promise<Transaction>
    {
        const transaction = new Transaction();

        const transactionContext: ITransactionContext = {
            transaction,
            amount,
            operationType: command.getOperationType(),
            sourceAccount: strategy.account
        };

        return this.executeTransaction(transaction, command, transactionContext);
    }
}