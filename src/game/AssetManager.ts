import { Assets, BitmapFont, Texture } from "pixi.js";

type MainMenuTextures = {
    background: Texture;
}

type GameTextures = {
    background: Texture;
    button: Texture;
}

export class AssetManager
{
    public static async loadMainMenuAssets(): Promise<MainMenuTextures>
    {
        const fetchedAssets = await Assets.load([
            {
                alias: "menu_background",
                src: "assets/backgrounds/main_menu.png"
            }
        ]);

        return {
            background: fetchedAssets.menu_background
        };
    }

    public static async loadGameAssets(): Promise<GameTextures>
    {
        const fetchedAssets = await Assets.load([
            {
                alias: "game_background",
                src: "assets/backgrounds/game.png"
            },
            {
                alias: "button",
                src: "assets/button.png"
            }
        ]);

        return {
            background: fetchedAssets.game_background,
            button: fetchedAssets.button
        };
    }

    public static async loadFont(): Promise<void>
    {
        await document.fonts.load("16px VPPixel");
        await document.fonts.ready;

        BitmapFont.install({
            name: "VPPixel",
            style: {
                fontFamily: "VPPixel",
                fontSize: 80,
                fill: 0xFFFFFF
            },
            chars: [
                ["a", "z"],
                ["A", "Z"],
                ["0", "9"],
                " .,!?-:×"
            ],
            resolution: 2,
            padding: 4
        });
    }
}