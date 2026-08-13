import { Container, Text } from "pixi.js";
import { ScreenSize } from "../../utils/ScreenSize.ts";
import {
    TRANSACTION_COMPLETED_LAYOUT
} from "./TransactionCompletedConfig.ts";

export type OptionComponents = {
    row: Container;
    label: Text;
};

type TransactionCompletedLayoutComponents = {
    title: Text;
    message: Text;
    options: OptionComponents[];
    okButton: Text;
};

export function layout(components: TransactionCompletedLayoutComponents, screen: ScreenSize): void
{
    layoutHeader(components, screen);
    layoutOptions(components.options, screen);
    layoutActions(components, screen);
}

function layoutHeader(components: TransactionCompletedLayoutComponents, screen: ScreenSize): void
{
    components.title.anchor.set(TRANSACTION_COMPLETED_LAYOUT.title.anchor.x, TRANSACTION_COMPLETED_LAYOUT.title.anchor.y);
    components.title.position.set(
        screen.width * TRANSACTION_COMPLETED_LAYOUT.title.position.xRatio,
        screen.height * TRANSACTION_COMPLETED_LAYOUT.title.position.yRatio);

    components.message.anchor.set(TRANSACTION_COMPLETED_LAYOUT.message.anchor.x, TRANSACTION_COMPLETED_LAYOUT.message.anchor.y);
    components.message.position.set(
        screen.width * TRANSACTION_COMPLETED_LAYOUT.message.position.xRatio,
        screen.height * TRANSACTION_COMPLETED_LAYOUT.message.position.yRatio
    );
}

function layoutOptions(options: OptionComponents[], screen: ScreenSize): void
{
    options.forEach((option, index) =>
    {
        option.label.position.set(TRANSACTION_COMPLETED_LAYOUT.options.label.position.x, TRANSACTION_COMPLETED_LAYOUT.options.label.position.y);
        option.row.position.set(
            screen.width * TRANSACTION_COMPLETED_LAYOUT.options.position.xRatio,
            screen.height * TRANSACTION_COMPLETED_LAYOUT.options.position.yRatio +
            index * TRANSACTION_COMPLETED_LAYOUT.options.rowGap
        );
    });
}

function layoutActions(components: TransactionCompletedLayoutComponents, screen: ScreenSize): void
{
    components.okButton.anchor.set(TRANSACTION_COMPLETED_LAYOUT.okButton.anchor.x, TRANSACTION_COMPLETED_LAYOUT.okButton.anchor.y);
    components.okButton.position.set(
        screen.width * TRANSACTION_COMPLETED_LAYOUT.okButton.position.xRatio,
        screen.height * TRANSACTION_COMPLETED_LAYOUT.okButton.position.yRatio
    );
}