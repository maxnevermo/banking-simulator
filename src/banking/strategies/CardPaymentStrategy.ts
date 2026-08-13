import {
    IPaymentRefillableStrategy
} from "./IPaymentStrategy.ts";
import { IAccount } from "../account/IAccount.ts";
import { FeeCalculator } from "../transactions/FeeCalculator.ts";

export class CardPaymentStrategy implements IPaymentRefillableStrategy
{
    constructor(readonly account: IAccount)
    {
    }

    pay(amount: number): void
    {
        this.account.spend(amount + FeeCalculator.calculateFor(this.account, amount));
    }

    topUp(amount: number): void
    {
        this.account.deposit(amount);
    }

    withdraw(amount: number): void
    {
        this.account.spend(amount + FeeCalculator.calculateFor(this.account, amount));
    }
}