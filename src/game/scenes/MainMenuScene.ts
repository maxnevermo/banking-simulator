import { Scene } from "./Scene.ts";
import { Application } from "pixi.js";

export class MainMenuScene extends Scene
{
    constructor(private readonly app: Application)
    {
        super();
    }

    async init()
    {
    }
}