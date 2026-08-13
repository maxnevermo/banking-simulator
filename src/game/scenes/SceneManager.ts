import { SceneNavigator } from "./SceneNavigator.ts";
import { Scene } from "./Scene.ts";
import { SceneType } from "./SceneType.ts";
import { MainMenuScene } from "./main-menu/MainMenuScene.ts";
import { GameScene } from "./game/GameScene.ts";
import { Application } from "pixi.js";
import {
    BankingGameServiceFactory
} from "../services/banking-service/BankingGameServiceFactory.ts";

export class SceneManager implements SceneNavigator
{
    private currentScene: Scene | null = null;

    constructor(private readonly app: Application)
    {
    }

    public async goTo(scene: SceneType): Promise<void>
    {
        if (this.currentScene)
        {
            this.app.stage.removeChild(this.currentScene);
            this.currentScene.destroy({ children: true });
        }

        const newScene = this.createScene(scene);
        this.currentScene = newScene;

        await this.currentScene.init();
        this.app.stage.addChild(newScene);
    }

    private createScene(scene: SceneType): Scene
    {
        switch (scene)
        {
            case SceneType.MAIN_MENU:
                return new MainMenuScene(this.app, this);
            case SceneType.GAME:
                return new GameScene(this.app, BankingGameServiceFactory.create());
        }
    }
}