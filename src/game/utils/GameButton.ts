import { Sprite, Texture } from "pixi.js";

export class GameButton extends Sprite
{
    constructor(texture: Texture, public readonly buttonId: string)
    {
        super(texture);
    }
}