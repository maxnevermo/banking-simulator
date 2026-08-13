import {
    IPaymentStrategy
} from "./IPaymentStrategy.ts";
import { IAccount } from "../account/IAccount.ts";

export class CashPaymentStrategy implements IPaymentStrategy
{
    constructor(readonly account: IAccount)
    {
    }

    pay(amount: number): void
    {
        this.account.spend(amount);
    }
}