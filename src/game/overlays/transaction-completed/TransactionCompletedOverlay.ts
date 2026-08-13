import { Container, Graphics, Text } from "pixi.js";
import { ScreenSize } from "../../utils/ScreenSize.ts";
import {
    NotificationChannel
} from "../../services/notification-service/NotificationChannel.ts";
import {
    TRANSACTION_COMPLETED_COPY,
    TRANSACTION_COMPLETED_STYLE
} from "./TransactionCompletedConfig.ts";
import {
    layout,
    OptionComponents
} from "./TransactionCompletedLayout.ts";

type TransactionCompletedOverlayOptions = {
    screen: ScreenSize;
    message: string;
    onSubmit: (channels: NotificationChannel[]) => void;
};

export class TransactionCompletedOverlay extends Container
{
    private readonly selectedChannels = new Set<NotificationChannel>();

    constructor(private readonly options: TransactionCompletedOverlayOptions)
    {
        super();
        this.init();
    }

    private init(): void
    {
        const background = new Graphics()
            .rect(0, 0, this.options.screen.width, this.options.screen.height)
            .fill({
                color: TRANSACTION_COMPLETED_STYLE.backdrop.color,
                alpha: TRANSACTION_COMPLETED_STYLE.backdrop.alpha
            });

        const title = new Text({
            text: TRANSACTION_COMPLETED_COPY.title,
            style: {
                ...TRANSACTION_COMPLETED_STYLE.text,
                ...TRANSACTION_COMPLETED_STYLE.title
            }
        });

        const message = new Text({
            text: this.options.message,
            style: {
                ...TRANSACTION_COMPLETED_STYLE.text,
                ...TRANSACTION_COMPLETED_STYLE.message
            }
        });

        const options = this.createChannelOptions();
        const okButton = this.createOkButton();

        layout(
            {
                title,
                message,
                options,
                okButton
            },
            this.options.screen
        );

        this.addChild(background, title, message, ...options.map((option) => option.row), okButton);
    }

    private createOkButton(): Text
    {
        const okButton = new Text({
            text: TRANSACTION_COMPLETED_COPY.okButton,
            style: {
                ...TRANSACTION_COMPLETED_STYLE.text,
                ...TRANSACTION_COMPLETED_STYLE.okButton
            }
        });

        okButton.eventMode = "static";
        okButton.cursor = "pointer";
        okButton.on("pointerdown", () =>
        {
            this.options.onSubmit([...this.selectedChannels]);
        });

        return okButton;
    }

    private createChannelOptions(): OptionComponents[]
    {
        return TRANSACTION_COMPLETED_COPY.channels.map((channel) =>
        {
            const row = new Container();
            const value = channel.value as NotificationChannel;

            const checkbox = new Graphics();
            this.drawCheckbox(checkbox, false);

            const label = new Text({
                text: channel.label,
                style: {
                    ...TRANSACTION_COMPLETED_STYLE.text,
                    ...TRANSACTION_COMPLETED_STYLE.option
                }
            });

            row.eventMode = "static";
            row.cursor = "pointer";

            row.on("pointerdown", () =>
            {
                const isSelected = this.selectedChannels.has(value);

                if (isSelected)
                {
                    this.selectedChannels.delete(value);
                }
                else
                {
                    this.selectedChannels.add(value);
                }

                this.drawCheckbox(checkbox, !isSelected);
            });

            row.addChild(checkbox, label);

            return {
                row,
                label
            };
        });
    }

    private drawCheckbox(checkbox: Graphics, selected: boolean): void
    {
        checkbox.clear();

        const {
            size,
            borderColor,
            selectedColor,
            borderWidth,
            selectedPadding
        } = TRANSACTION_COMPLETED_STYLE.checkbox;

        checkbox.rect(0, 0, size, size).stroke({
            color: borderColor,
            width: borderWidth
        });

        if (selected)
        {
            checkbox.rect(selectedPadding, selectedPadding, size - selectedPadding * 2, size - selectedPadding * 2)
                .fill({
                    color: selectedColor
                });
        }
    }
}