import { AccountType } from "./AccountType.ts";

export interface IAccount
{
    readonly type: AccountType;

    getBalance(): number;
    canSpend(amount: number): boolean;
    spend(amount: number): void;
    deposit(amount: number): void;
}