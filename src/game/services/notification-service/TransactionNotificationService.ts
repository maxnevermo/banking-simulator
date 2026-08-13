import {
    Transaction
} from "../../../banking/transactions/Transaction.ts";
import {
    NotificationChannel
} from "./NotificationChannel.ts";
import {
    TransactionObserver
} from "../../../banking/notifiers/TransactionObserver.ts";
import {
    INotifier
} from "../../../banking/notifiers/INotifier.ts";
import {
    ConsoleNotifier
} from "../../../banking/notifiers/ConsoleNotifier.ts";
import {
    FileNotifier
} from "../../../banking/notifiers/FileNotifier.ts";
import {
    EmailNotifier
} from "../../../banking/notifiers/EmailNotifier.ts";


export class TransactionNotificationService
{
    public async notify(transaction: Transaction, channels: NotificationChannel[], email?: string): Promise<void>
    {
        const observer = new TransactionObserver();

        channels.forEach((channel) =>
        {
            const notifier = this.createNotifier(channel, email);

            if (notifier)
            {
                observer.subscribe(notifier);
            }
        });

        await observer.notifyAll(transaction);
    }

    private createNotifier(channel: NotificationChannel, email?: string): INotifier | null
    {
        switch (channel)
        {
            case "console":
                return new ConsoleNotifier();

            case "file":
                return new FileNotifier();

            case "email":
                return email ? new EmailNotifier(email) : null;

            default:
                throw new Error(`Unknown notification channel: ${channel}`);
        }
    }
}