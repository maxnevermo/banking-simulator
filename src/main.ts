import { Application } from "pixi.js";
import { SceneManager } from "./game/scenes/SceneManager.ts";
import { SceneType } from "./game/scenes/SceneType.ts";
import { AssetManager } from "./game/AssetManager.ts";

(async () =>
{
    const app = new Application();

    await app.init({
        background: "#FFFFFF",
        resizeTo: window
    });

    await AssetManager.loadFont();

    document.getElementById("pixi-container")!.appendChild(app.canvas);

    const sceneManager = new SceneManager(app);
    await sceneManager.goTo(SceneType.MAIN_MENU);
})();
