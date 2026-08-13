import { IAccount } from "../account/IAccount.ts";
import { AccountType } from "../account/AccountType.ts";

const FEE_SHARE = 0.01;
const MINIMUM_FEE = 5;

export class FeeCalculator
{
    static calculateFor(account: IAccount, amount: number): number
    {
        if (account.type !== AccountType.CARD)
        {
            return 0;
        }

        return amount * FEE_SHARE + MINIMUM_FEE;
    }
}