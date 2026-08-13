import { ScreenSize } from "../../utils/ScreenSize.ts";
import { Container } from "pixi.js";
import {
    BankingGameService
} from "../../services/banking-service/BankingGameService.ts";
import { GameSceneView } from "./GameSceneView.ts";
import {
    TransactionNotificationService
} from "../../services/notification-service/TransactionNotificationService.ts";
import {
    AccountChoiceOverlay
} from "../../overlays/account-choice/AccountChoiceOverlay.ts";
import {
    OperationType
} from "../../../banking/transactions/OperationType.ts";
import {
    TransactionCompletedOverlay
} from "../../overlays/transaction-completed/TransactionCompletedOverlay.ts";
import {
    generateTransactionCompletedMessage
} from "../../../banking/notifiers/NotifierUtilities.ts";
import {
    InputOverlay
} from "../../overlays/input/InputOverlay.ts";
import {
    NotificationChannel
} from "../../services/notification-service/NotificationChannel.ts";
import {
    Transaction
} from "../../../banking/transactions/Transaction.ts";
import {
    AccountType
} from "../../../banking/account/AccountType.ts";

type GameFlowControllerOptions = {
    screen: ScreenSize;
    overlayParent: Container;
    bankingService: BankingGameService;
    gameView: GameSceneView;
    notificationService: TransactionNotificationService;
};

export class GameFlowController
{
    private activeOverlay: Container | null = null;

    constructor(private readonly options: GameFlowControllerOptions)
    {
    }

    public openAccountChoiceOverlay(operation: OperationType): void
    {
        const overlay = new AccountChoiceOverlay({
            screen: this.options.screen,
            onSubmit: (accountType) =>
            {
                this.closeActiveOverlay();
                this.openAmountOverlay(operation, accountType);
            }
        });

        this.openOverlay(overlay);
    }

    private openAmountOverlay(operation: OperationType, accountType: AccountType): void
    {
        const overlay = new InputOverlay({
            screen: this.options.screen,
            title: "Enter amount",
            placeholder: "Amount",
            onSubmit: async (value) =>
            {
                const amount = Number(value);

                this.closeActiveOverlay();

                const transaction = await this.options.bankingService.execute(
                    operation,
                    amount,
                    accountType
                );

                this.options.gameView.updateUserBalances(
                    this.options.bankingService.getUserBalances()
                );

                this.openTransactionCompletedOverlay(transaction);
            }
        });

        this.openOverlay(overlay);
    }

    private openTransactionCompletedOverlay(transaction: Transaction): void
    {
        const overlay = new TransactionCompletedOverlay({
            screen: this.options.screen,
            message: generateTransactionCompletedMessage(transaction),
            onSubmit: (channels) =>
            {
                this.closeActiveOverlay();

                if (channels.includes("email"))
                {
                    this.openEmailOverlay(transaction, channels);
                    return;
                }

                void this.options.notificationService.notify(transaction, channels);
            }
        });

        this.openOverlay(overlay);
    }

    private openEmailOverlay(transaction: Transaction, channels: NotificationChannel[]): void
    {
        const overlay = new InputOverlay({
            screen: this.options.screen,
            title: "Enter email",
            placeholder: "Email",
            onSubmit: async (email) =>
            {
                this.closeActiveOverlay();
                await this.options.notificationService.notify(transaction, channels, email);
            }
        });

        this.openOverlay(overlay);
    }

    private openOverlay(overlay: Container): void
    {
        this.activeOverlay = overlay;
        this.options.overlayParent.addChild(overlay);
    }

    private closeActiveOverlay(): void
    {
        if (!this.activeOverlay)
        {
            return;
        }

        this.options.overlayParent.removeChild(this.activeOverlay);
        this.activeOverlay.destroy({ children: true });
        this.activeOverlay = null;
    }
}