import { Container, Graphics, Text } from "pixi.js";
import {
    AccountType
} from "../../../banking/account/AccountType.ts";
import { ScreenSize } from "../../utils/ScreenSize.ts";
import {
    ACCOUNT_CHOICE_COPY,
    ACCOUNT_CHOICE_STYLE
} from "./AccountChoiceConfig.ts";
import { layout } from "./AccountChoiceLayout.ts";

type AccountChoiceOverlayOptions = {
    screen: ScreenSize;
    onSubmit: (accountType: AccountType) => void;
};

export class AccountChoiceOverlay extends Container
{
    constructor(private readonly options: AccountChoiceOverlayOptions)
    {
        super();
        this.init();
    }

    private init(): void
    {
        const background = new Graphics().rect(0, 0, this.options.screen.width, this.options.screen.height)
            .fill({
                color: ACCOUNT_CHOICE_STYLE.backdrop.color,
                alpha: ACCOUNT_CHOICE_STYLE.backdrop.alpha
            });
        const title = new Text({
            text: ACCOUNT_CHOICE_COPY.title,
            style: {
                ...ACCOUNT_CHOICE_STYLE.baseText,
                ...ACCOUNT_CHOICE_STYLE.title
            }
        });
        ;

        const accountButtons = ACCOUNT_CHOICE_COPY.accounts.map((account) =>
            this.createAccountButton(account.label, account.value)
        );

        layout(
            {
                title,
                accountButtons
            },
            this.options.screen
        );

        this.addChild(background, title, ...accountButtons);
    }

    private createAccountButton(label: string, accountType: AccountType): Text
    {
        const button = new Text({
            text: label,
            style: {
                ...ACCOUNT_CHOICE_STYLE.baseText,
                ...ACCOUNT_CHOICE_STYLE.accountButton
            }
        });

        button.eventMode = "static";
        button.cursor = "pointer";

        button.on("pointerdown", () =>
        {
            this.options.onSubmit(accountType);
        });

        return button;
    }
}