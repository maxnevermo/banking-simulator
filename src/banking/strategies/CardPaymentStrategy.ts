import {
    IPaymentRefillableStrategy
} from "./IPaymentStrategy.ts";
import { IAccount } from "../account/IAccount.ts";
import { FeeCalculator } from "../transactions/FeeCalculator.ts";

export class CardPaymentStrategy implements IPaymentRefillableStrategy
{
    constructor(private readonly account: IAccount)
    {
    }

    pay(amount: number)
    {
        this.account.spend(amount + FeeCalculator.calculateFor(this.account, amount));
    }

    topUp(amount: number)
    {
        this.account.deposit(amount);
    }

    withdraw(amount: number)
    {
        this.account.spend(amount + FeeCalculator.calculateFor(this.account, amount));
    }
}