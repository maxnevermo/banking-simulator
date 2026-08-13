import { Scene } from "./Scene.ts";
import { Application } from "pixi.js";

export class GameScene extends Scene
{
    constructor(private readonly app: Application)
    {
        super();
    }

    async init()
    {
    }
}