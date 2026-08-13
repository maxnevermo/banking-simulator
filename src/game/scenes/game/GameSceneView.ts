import { Container, Sprite, Text, Texture } from "pixi.js";
import {
    GAME_OPTIONS,
    GAME_STYLE
} from "./GameConfig.ts";
import { layout } from "./GameLayout.ts";
import { GameButton } from "../../utils/GameButton.ts";
import { ScreenSize } from "../../utils/ScreenSize.ts";
import {
    UserBalances
} from "../../services/banking-service/UserBalances.ts";
import {
    OperationType
} from "../../../banking/transactions/OperationType.ts";

type GameSceneViewOptions = {
    screen: ScreenSize;
    backgroundTexture: Texture;
    buttonTexture: Texture;
    userBalances: UserBalances;
    onOptionClick: (operation: OperationType) => void;
};

export class GameSceneView extends Container
{

    private readonly cardBalanceText: Text;
    private readonly cashBalanceText: Text;

    constructor(options: GameSceneViewOptions)
    {
        super();

        this.cardBalanceText = this.createBalanceText(
            this.formatCardBalance(options.userBalances.card)
        );

        this.cashBalanceText = this.createBalanceText(
            this.formatCashBalance(options.userBalances.cash)
        );

        const background = new Sprite(options.backgroundTexture);

        const optionTexts = GAME_OPTIONS.map((option) =>
            this.createOptionText(option.label)
        );

        const buttons = GAME_OPTIONS.map((option) =>
            this.createTerminalButton(
                option.buttonId,
                option.operation,
                options.buttonTexture,
                options.onOptionClick
            )
        );

        const components = {
            options: optionTexts,
            buttons,
            cardBalance: this.cardBalanceText,
            cashBalance: this.cashBalanceText
        };

        layout(components, options.screen);

        this.addChild(background, ...optionTexts, ...buttons, this.cardBalanceText, this.cashBalanceText);
    }

    private createOptionText(optionText: string): Text
    {
        return new Text({
            text: optionText,
            style: {
                ...GAME_STYLE.baseText,
                ...GAME_STYLE.option
            }
        });
    }

    private createTerminalButton(id: string, operation: OperationType, buttonTexture: Texture, onOptionClick: (operation: OperationType) => void): GameButton
    {
        const button = new GameButton(buttonTexture, id);

        button.eventMode = "static";
        button.cursor = "pointer";

        button.on("pointerdown", () =>
        {
            onOptionClick(operation);
        });

        return button;
    }

    public updateUserBalances(userBalances: UserBalances): void
    {
        this.cardBalanceText.text = this.formatCardBalance(userBalances.card);
        this.cashBalanceText.text = this.formatCashBalance(userBalances.cash);
    }

    private createBalanceText(text: string): Text
    {
        return new Text({
            text,
            style: {
                ...GAME_STYLE.baseText,
                ...GAME_STYLE.balance
            }
        });
    }

    private formatCardBalance(balance: number): string
    {
        return `Card: ${balance}`;
    }

    private formatCashBalance(balance: number): string
    {
        return `Cash: ${balance}`;
    }
}