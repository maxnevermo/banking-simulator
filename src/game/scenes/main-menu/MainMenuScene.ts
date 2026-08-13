import { Scene } from "../Scene.ts";
import { Application, Sprite, Text } from "pixi.js";
import { AssetManager } from "../../AssetManager.ts";
import { SceneNavigator } from "../SceneNavigator.ts";
import { SceneType } from "../SceneType.ts";
import {
    MAIN_MENU_COPY,
    MAIN_MENU_STYLE
} from "./utils/MainMenuConfig.ts";
import { layout } from "./utils/MainMenuLayout.ts";

export class MainMenuScene extends Scene
{
    constructor(private readonly app: Application, private readonly sceneManager: SceneNavigator)
    {
        super();
    }

    public async init()
    {
        const backgroundTexture = await AssetManager.loadMainMenuAssets();
        const backgroundSprite = new Sprite(backgroundTexture.background);

        const gameTitle = new Text({
            text: MAIN_MENU_COPY.title,
            style: {
                ...MAIN_MENU_STYLE.base,
                ...MAIN_MENU_STYLE.title
            }
        });

        const playButton = new Text({
            text: "Play",
            style: {
                ...MAIN_MENU_STYLE.base
            }
        });

        const components = {
            title: gameTitle,
            button: playButton
        };

        layout(components, this.app.screen);

        playButton.eventMode = "static";
        playButton.cursor = "pointer";

        playButton.on("pointerdown", () =>
        {
            this.sceneManager.goTo(SceneType.GAME);
        });

        this.addChild(backgroundSprite, gameTitle, playButton);
    }
}