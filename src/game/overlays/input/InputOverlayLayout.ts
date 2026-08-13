import { Text } from "pixi.js";
import { Input } from "@pixi/ui";
import { ScreenSize } from "../../utils/ScreenSize.ts";
import { INPUT_OVERLAY_LAYOUT } from "./InputOverlayConfig.ts";

type InputOverlayLayoutComponents = {
    title: Text;
    input: Input;
    okButton: Text;
};

export function layout(components: InputOverlayLayoutComponents, screen: ScreenSize): void
{
    components.title.anchor.set(INPUT_OVERLAY_LAYOUT.title.anchor.x, INPUT_OVERLAY_LAYOUT.title.anchor.y);
    components.title.position.set(
        screen.width * INPUT_OVERLAY_LAYOUT.title.position.xRatio,
        screen.height * INPUT_OVERLAY_LAYOUT.title.position.yRatio +
        INPUT_OVERLAY_LAYOUT.title.position.yOffset
    );

    components.input.position.set(
        screen.width * INPUT_OVERLAY_LAYOUT.input.position.xRatio +
        INPUT_OVERLAY_LAYOUT.input.position.xOffset,
        screen.height * INPUT_OVERLAY_LAYOUT.input.position.yRatio +
        INPUT_OVERLAY_LAYOUT.input.position.yOffset
    );
    components.okButton.anchor.set(INPUT_OVERLAY_LAYOUT.okButton.anchor.x, INPUT_OVERLAY_LAYOUT.okButton.anchor.y);

    components.okButton.position.set(
        screen.width * INPUT_OVERLAY_LAYOUT.okButton.position.xRatio,
        screen.height * INPUT_OVERLAY_LAYOUT.okButton.position.yRatio +
        INPUT_OVERLAY_LAYOUT.okButton.position.yOffset
    );
}