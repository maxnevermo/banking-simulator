import { Container } from "pixi.js";

export abstract class Scene extends Container
{
    public abstract init(): Promise<void>;

    // eslint-disable-next-line
    public update(_delta: number): void
    {
    }
}