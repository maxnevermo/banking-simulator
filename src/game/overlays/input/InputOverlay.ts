import { Input } from "@pixi/ui";
import { Container, Graphics, Text } from "pixi.js";
import { ScreenSize } from "../../utils/ScreenSize.ts";
import {
    INPUT_OVERLAY_COPY,
    INPUT_OVERLAY_STYLE
} from "./InputOverlayConfig.ts";
import { layout } from "./InputOverlayLayout.ts";

type InputOverlayOptions = {
    screen: ScreenSize;
    title: string;
    placeholder: string;
    onSubmit: (value: string) => void;
};

export class InputOverlay extends Container
{
    private input!: Input;

    constructor(private readonly options: InputOverlayOptions)
    {
        super();
        this.init();
    }

    private init(): void
    {
        const background = new Graphics()
            .rect(0, 0, this.options.screen.width, this.options.screen.height)
            .fill({
                color: INPUT_OVERLAY_STYLE.backdrop.color,
                alpha: INPUT_OVERLAY_STYLE.backdrop.alpha
            });

        const title = new Text({
            text: this.options.title,
            style: {
                ...INPUT_OVERLAY_STYLE.baseText,
                ...INPUT_OVERLAY_STYLE.title
            }
        });

        const input = this.createInput();
        const okButton = this.createOkButton();

        this.input = input;

        const components = {
            title,
            input,
            okButton
        };

        layout(components, this.options.screen);

        this.addChild(background, title, input, okButton);
    }

    private createInput(): Input
    {
        const inputBackground = new Graphics()
            .roundRect(
                0,
                0,
                INPUT_OVERLAY_STYLE.input.width,
                INPUT_OVERLAY_STYLE.input.height,
                INPUT_OVERLAY_STYLE.input.radius
            )
            .fill({ color: INPUT_OVERLAY_STYLE.input.backgroundColor })
            .stroke({
                color: INPUT_OVERLAY_STYLE.input.borderColor,
                width: INPUT_OVERLAY_STYLE.input.borderWidth
            });

        return new Input({
            bg: inputBackground,
            placeholder: this.options.placeholder,
            textStyle: INPUT_OVERLAY_STYLE.input.text,
            padding: INPUT_OVERLAY_STYLE.input.padding,
            addMask: INPUT_OVERLAY_STYLE.input.mask
        });
    }

    private createOkButton(): Text
    {
        const okButton = new Text({
            text: INPUT_OVERLAY_COPY.okButton,
            style: {
                ...INPUT_OVERLAY_STYLE.baseText,
                ...INPUT_OVERLAY_STYLE.okButton
            }
        });

        okButton.eventMode = "static";
        okButton.cursor = "pointer";

        okButton.on("pointerdown", () =>
        {
            this.options.onSubmit(this.input.value);
        });

        return okButton;
    }
}