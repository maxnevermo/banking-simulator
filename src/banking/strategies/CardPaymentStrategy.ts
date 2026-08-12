import {
    IPaymentRefillableStrategy
} from "./IPaymentStrategy.ts";
import { IAccount } from "../account/IAccount.ts";

export class CardPaymentStrategy implements IPaymentRefillableStrategy
{
    constructor(private readonly account: IAccount)
    {
    }

    pay(amount: number)
    {
        this.account.spend(amount);
    }

    topUp(amount: number)
    {
        this.account.deposit(amount);
    }

    withdraw(amount: number)
    {
        this.account.spend(amount);
    }
}