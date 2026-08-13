import { BankingGameService } from "./BankingGameService.ts";
import { Account } from "../../../banking/account/Account.ts";
import {
    AccountType
} from "../../../banking/account/AccountType.ts";

const START_BALANCE_CONFIG = {
    card: {
        min: 500,
        max: 5000
    },
    cash: {
        min: 100,
        max: 1500
    }
} as const;

export class BankingGameServiceFactory
{
    public static create(): BankingGameService
    {
        const cardAccount = new Account(
            AccountType.CARD,
            this.getRandomBalance(
                START_BALANCE_CONFIG.card.min,
                START_BALANCE_CONFIG.card.max
            )
        );

        const cashAccount = new Account(
            AccountType.CASH,
            this.getRandomBalance(
                START_BALANCE_CONFIG.cash.min,
                START_BALANCE_CONFIG.cash.max
            )
        );

        return new BankingGameService(cashAccount, cardAccount);
    }

    private static getRandomBalance(min: number, max: number): number
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}