import { Container, Sprite, Text, Texture } from "pixi.js";
import {
    MAIN_MENU_COPY,
    MAIN_MENU_STYLE
} from "./utils/MainMenuConfig.ts";
import { layout } from "./utils/MainMenuLayout.ts";
import { ScreenSize } from "../../utils/ScreenSize.ts";

type MainMenuViewOptions = {
    screen: ScreenSize;
    backgroundTexture: Texture;
    onPlayClick: () => void;
};

export class MainMenuView extends Container
{
    constructor(options: MainMenuViewOptions)
    {
        super();

        const background = new Sprite(options.backgroundTexture);
        const title = new Text({
            text: MAIN_MENU_COPY.title,
            style: {
                ...MAIN_MENU_STYLE.base,
                ...MAIN_MENU_STYLE.title
            }
        });
        const playButton = new Text({
            text: MAIN_MENU_COPY.playButton,
            style: {
                ...MAIN_MENU_STYLE.base
            }
        });

        playButton.eventMode = "static";
        playButton.cursor = "pointer";
        playButton.on("pointerdown", options.onPlayClick);

        const components = {
            title,
            button: playButton
        };

        layout(components, options.screen);

        this.addChild(background, title, playButton);
    }
}