import { Scene } from "../Scene.ts";
import { Application } from "pixi.js";
import { AssetManager } from "../../AssetManager.ts";
import { GameSceneView } from "./GameSceneView.ts";

export class GameScene extends Scene
{
    constructor(private readonly app: Application)
    {
        super();
    }

    public async init(): Promise<void>
    {
        const gameTextures = await AssetManager.loadGameAssets();

        const view = new GameSceneView({
            screen: this.app.screen,
            backgroundTexture: gameTextures.background,
            buttonTexture: gameTextures.button,
            onOptionClick: (buttonId: string) =>
            {
                //TODO: IMPLEMENT OPTION CLICK
            }
        });

        this.addChild(view);
    }
}