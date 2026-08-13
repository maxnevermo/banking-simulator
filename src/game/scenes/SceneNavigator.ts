import { SceneType } from "./SceneType.ts";

export interface SceneNavigator
{
    goTo(scene: SceneType): Promise<void>;
}