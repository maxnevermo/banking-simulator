import { IAccount } from "../account/IAccount.ts";

export interface IPaymentStrategy
{
    readonly account: IAccount;

    pay(amount: number): void;
}

export interface IPaymentRefillableStrategy extends IPaymentStrategy
{
    topUp(amount: number): void;
    withdraw(amount: number): void;
}