import { Container, Sprite, Text, Texture } from "pixi.js";
import {
    GAME_CONFIG,
    GAME_OPTIONS,
    GAME_STYLE
} from "./utils/GameConfig.ts";
import { layout } from "./utils/GameLayout.ts";
import { GameButton } from "../../utils/GameButton.ts";
import { ScreenSize } from "../../utils/ScreenSize.ts";

type GameSceneViewOptions = {
    screen: ScreenSize;
    backgroundTexture: Texture;
    buttonTexture: Texture;
    onOptionClick: (buttonId: string) => void;
};

export class GameSceneView extends Container
{
    constructor(options: GameSceneViewOptions)
    {
        super();

        const background = new Sprite(options.backgroundTexture);

        const optionTexts = GAME_OPTIONS.map((option) =>
            this.createOptionText(option.label)
        );

        const buttons = GAME_OPTIONS.map((option) =>
            this.createTerminalButton(
                option.buttonId,
                options.buttonTexture,
                options.onOptionClick
            )
        );

        const components = {
            options: optionTexts,
            buttons
        };

        layout(components, options.screen);

        this.addChild(background, ...optionTexts, ...buttons);
    }

    private createOptionText(optionText: string): Text
    {
        return new Text({
            text: optionText,
            style: GAME_STYLE.option
        });
    }

    private createTerminalButton(
        id: string,
        buttonTexture: Texture,
        onOptionClick: (buttonId: string) => void
    ): GameButton
    {
        const button = new GameButton(buttonTexture, id);

        button.eventMode = GAME_CONFIG.button.eventMode;
        button.cursor = GAME_CONFIG.button.cursor;

        button.on("pointerdown", () =>
        {
            onOptionClick(id);
        });

        return button;
    }
}