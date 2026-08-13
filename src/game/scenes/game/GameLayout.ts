import { GameButton } from "../../utils/GameButton.ts";
import { GAME_LAYOUT } from "./GameConfig.ts";
import { Text } from "pixi.js";
import { ScreenSize } from "../../utils/ScreenSize.ts";

type GameLayoutComponents = {
    options: Text[];
    buttons: GameButton[];
    cardBalance: Text;
    cashBalance: Text;
};

export function layout(components: GameLayoutComponents, screen: ScreenSize): void
{
    components.cardBalance.anchor.set(GAME_LAYOUT.balances.anchor.x, GAME_LAYOUT.balances.anchor.y);
    components.cardBalance.position.set(screen.width * GAME_LAYOUT.balances.card.xRatio, screen.height * GAME_LAYOUT.balances.card.yRatio);

    components.cashBalance.anchor.set(GAME_LAYOUT.balances.anchor.x, GAME_LAYOUT.balances.anchor.y);
    components.cashBalance.position.set(screen.width * GAME_LAYOUT.balances.cash.xRatio, screen.height * GAME_LAYOUT.balances.cash.yRatio);

    components.options.forEach((option, index) =>
    {
        const isLeftColumn = index % 2 === 0;
        const isTopRow = index < 2;

        const optionX = isLeftColumn
            ? screen.width * GAME_LAYOUT.terminalScreen.leftXRatio
            : screen.width * GAME_LAYOUT.terminalScreen.rightXRatio;

        const buttonX = isLeftColumn
            ? screen.width * GAME_LAYOUT.buttons.leftXRatio
            : screen.width * GAME_LAYOUT.buttons.rightXRatio;

        const y = isTopRow
            ? screen.height * GAME_LAYOUT.terminalScreen.topYRatio
            : screen.height * GAME_LAYOUT.terminalScreen.bottomYRatio;

        option.anchor.set(
            isLeftColumn
                ? GAME_LAYOUT.options.anchor.leftColumn.x
                : GAME_LAYOUT.options.anchor.rightColumn.x,
            isLeftColumn
                ? GAME_LAYOUT.options.anchor.leftColumn.y
                : GAME_LAYOUT.options.anchor.rightColumn.y
        );

        option.position.set(optionX, y);

        const button = components.buttons[index];

        button.rotation = isLeftColumn ? Math.PI : 0;
        button.anchor.set(GAME_LAYOUT.buttons.anchor.x, GAME_LAYOUT.buttons.anchor.y);
        button.scale.set(GAME_LAYOUT.buttons.scale);
        button.position.set(buttonX, y);
    });
}