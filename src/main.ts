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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    globalThis.__PIXI_APP__ = app;

    await AssetManager.loadFont();

    document.getElementById("pixi-container")!.appendChild(app.canvas);

    const sceneManager = new SceneManager(app);
    await sceneManager.goTo(SceneType.MAIN_MENU);
})();
