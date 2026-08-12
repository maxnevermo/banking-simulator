import { AccountType } from "./AccountType.ts";
import { IAccount } from "./IAccount.ts";

export class Account implements IAccount
{
    constructor(readonly type: AccountType,
                private balance: number)
    {
    }

    getBalance(): number
    {
        return this.balance;
    }

    canSpend(amount: number): boolean
    {
        return amount > 0 && this.balance >= amount;
    }

    spend(amount: number): void
    {
        if (!this.canSpend(amount))
        {
            throw new Error("Invalid amount or not enough funds");
        }

        this.balance -= amount;
    }

    deposit(amount: number): void
    {
        if (amount <= 0)
        {
            throw new Error("Deposit amount must be positive");
        }

        this.balance += amount;
    }
}
