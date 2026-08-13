import { Application } from "pixi.js";
import { Scene } from "../Scene.ts";
import { AssetManager } from "../../AssetManager.ts";
import { SceneNavigator } from "../SceneNavigator.ts";
import { SceneType } from "../SceneType.ts";
import { MainMenuView } from "./MainSceneView.ts";

export class MainMenuScene extends Scene
{
    constructor(
        private readonly app: Application,
        private readonly sceneManager: SceneNavigator
    )
    {
        super();
    }

    public async init(): Promise<void>
    {
        const assets = await AssetManager.loadMainMenuAssets();

        const view = new MainMenuView({
            screen: this.app.screen,
            backgroundTexture: assets.background,
            onPlayClick: () =>
            {
                this.sceneManager.goTo(SceneType.GAME);
            }
        });

        this.addChild(view);
    }
}