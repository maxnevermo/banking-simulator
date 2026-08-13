import { MAIN_MENU_LAYOUT } from "./MainMenuConfig.ts";
import { Text } from "pixi.js";

type MainMenuLayoutComponents = {
    title: Text;
    button: Text;
};

type ScreenSize = {
    width: number;
    height: number;
};

export function layout(components: MainMenuLayoutComponents, screen: ScreenSize)
{
    const { title, button } = components;

    title.anchor.set(
        MAIN_MENU_LAYOUT.title.anchor.x,
        MAIN_MENU_LAYOUT.title.anchor.y
    );

    title.position.set(
        screen.width * MAIN_MENU_LAYOUT.title.position.xRatio,
        MAIN_MENU_LAYOUT.title.position.y
    );

    button.anchor.set(MAIN_MENU_LAYOUT.playButton.anchor.x, MAIN_MENU_LAYOUT.playButton.anchor.y);

    button.position.set(
        screen.width * MAIN_MENU_LAYOUT.playButton.position.xRatio,
        screen.height * MAIN_MENU_LAYOUT.playButton.position.yRatio
    );
}