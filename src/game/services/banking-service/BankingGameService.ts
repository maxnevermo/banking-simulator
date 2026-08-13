import {
    AccountType
} from "../../../banking/account/AccountType.ts";
import {
    CardPaymentStrategy
} from "../../../banking/strategies/CardPaymentStrategy.ts";
import {
    CashPaymentStrategy
} from "../../../banking/strategies/CashPaymentStrategy.ts";
import {
    IPaymentStrategy
} from "../../../banking/strategies/IPaymentStrategy.ts";
import {
    TerminalFacade
} from "../../../banking/facade/TerminalFacade.ts";
import {
    OperationAllowedHandler
} from "../../../banking/handlers/OperationAllowedHandler.ts";
import {
    FeeCalculationHandler
} from "../../../banking/handlers/FeeCalculationHandler.ts";
import {
    FundsAvailableHandler
} from "../../../banking/handlers/FundsAvailableHandler.ts";
import {
    Transaction
} from "../../../banking/transactions/Transaction.ts";
import { IAccount } from "../../../banking/account/IAccount.ts";
import {
    OperationType
} from "../../../banking/transactions/OperationType.ts";
import { UserBalances } from "./UserBalances.ts";
import {
    TransactionStatus
} from "../../../banking/states/TransactionStatus.ts";

export class BankingGameService
{
    private readonly cardStrategy: CardPaymentStrategy;
    private readonly cashStrategy: CashPaymentStrategy;
    private readonly terminal: TerminalFacade;

    constructor(
        private readonly cashAccount: IAccount,
        private readonly cardAccount: IAccount
    )
    {
        this.cardStrategy = new CardPaymentStrategy(this.cardAccount);
        this.cashStrategy = new CashPaymentStrategy(this.cashAccount);
        this.terminal = this.createTerminal();
    }

    public async execute(operation: OperationType, amount: number, source: AccountType): Promise<Transaction>
    {
        const strategy = this.getStrategy(source);

        switch (operation)
        {
            case OperationType.TOP_UP:
                return this.topUp(amount, strategy);

            case OperationType.WITHDRAW:
                return this.withdraw(amount, strategy);

            case OperationType.UTILITIES:
                return this.terminal.payUtilities(amount, strategy);

            case OperationType.LOANS:
                return this.terminal.payLoan(amount, strategy);
        }
    }

    private getStrategy(source: AccountType): IPaymentStrategy
    {
        switch (source)
        {
            case AccountType.CARD:
                return this.cardStrategy;

            case AccountType.CASH:
                return this.cashStrategy;
        }
    }

    private createTerminal(): TerminalFacade
    {
        const operationAllowedHandler = new OperationAllowedHandler();
        const feeCalculationHandler = new FeeCalculationHandler();
        const fundsAvailableHandler = new FundsAvailableHandler();

        operationAllowedHandler
            .setNext(feeCalculationHandler)
            .setNext(fundsAvailableHandler);

        return new TerminalFacade(operationAllowedHandler);
    }

    public getUserBalances(): UserBalances
    {
        return {
            card: this.cardAccount.getBalance(),
            cash: this.cashAccount.getBalance()
        };
    }

    private async withdraw(amount: number, strategy: IPaymentStrategy): Promise<Transaction>
    {
        const transaction = await this.terminal.withdraw(amount, strategy);

        if (transaction.getStatus() === TransactionStatus.SUCCESS)
        {
            this.cashAccount.deposit(amount);
        }

        return transaction;
    }

    private async topUp(amount: number, strategy: IPaymentStrategy): Promise<Transaction>
    {
        const transaction = await this.terminal.topUp(amount, strategy);

        if (transaction.getStatus() === TransactionStatus.SUCCESS)
        {
            this.cardAccount.deposit(amount);
        }

        return transaction;
    }
}