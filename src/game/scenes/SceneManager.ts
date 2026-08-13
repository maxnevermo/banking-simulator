import { SceneNavigator } from "./SceneNavigator.ts";
import { Scene } from "./Scene.ts";
import { SceneType } from "./SceneType.ts";
import { MainMenuScene } from "./MainMenuScene.ts";
import { GameScene } from "./GameScene.ts";
import { Application } from "pixi.js";

export class SceneManager implements SceneNavigator
{
    private currentScene: Scene | null = null;

    constructor(private readonly app: Application)
    {
    }

    async goTo(scene: SceneType): Promise<void>
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

    createScene(scene: SceneType): Scene
    {
        switch (scene)
        {
            case SceneType.MAIN_MENU:
                return new MainMenuScene(this.app);
            case SceneType.GAME:
                return new GameScene(this.app);
        }
    }
}