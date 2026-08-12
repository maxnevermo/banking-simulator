import { Transaction } from "../transactions/Transaction.ts";
import { Command } from "../commands/Command.ts";
import { WithdrawCommand } from "../commands/WithdrawCommand.ts";
import {
    ITransactionContext
} from "../handlers/ITransactionContext.ts";
import { IAccount } from "../account/IAccount.ts";
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
import {
    CardPaymentStrategy
} from "../strategies/CardPaymentStrategy.ts";


export class TerminalFacade
{
    constructor(
        private readonly account: IAccount,
        private readonly handlers: ITransactionHandler)
    {
    }

    public withdraw(amount: number, strategy: IPaymentStrategy): Transaction
    {
        if (!(strategy instanceof CardPaymentStrategy))
        {
            return this.createFailedTransaction("Withdraw operation is only available for card option");
        }

        return this.runCommand(new WithdrawCommand(strategy, amount), amount);
    }

    public topUp(amount: number, strategy: IPaymentStrategy): Transaction
    {
        if (!(strategy instanceof CardPaymentStrategy))
        {
            return this.createFailedTransaction("Top up operation is only available for card option");
        }

        return this.runCommand(new TopUpCommand(strategy, amount), amount);
    }

    public payLoan(amount: number, strategy: IPaymentStrategy): Transaction
    {
        return this.runCommand(new PayLoanCommand(strategy, amount), amount);
    }

    public payUtilities(amount: number, strategy: IPaymentStrategy): Transaction
    {
        return this.runCommand(new PayUtilitiesCommand(strategy, amount), amount);
    }

    private executeTransaction(transaction: Transaction, command: Command, context: ITransactionContext): Transaction
    {
        transaction.moveNext();

        const validationResult = this.handlers.handle(context);

        if (!validationResult.success)
        {
            transaction.fail(validationResult.message);

            return transaction;
        }

        command.execute();
        transaction.moveNext();

        return transaction;
    }

    private runCommand(command: Command, amount: number): Transaction
    {
        const transaction = new Transaction();

        const transactionContext: ITransactionContext = {
            transaction,
            amount,
            operationType: command.getOperationType(),
            sourceAccount: this.account
        };

        return this.executeTransaction(transaction, command, transactionContext);
    }

    private createFailedTransaction(reason: string): Transaction
    {
        const transaction = new Transaction();
        transaction.fail(reason);

        return transaction;
    }
}