import { Text } from "pixi.js";
import { ScreenSize } from "../../utils/ScreenSize.ts";
import { ACCOUNT_CHOICE_LAYOUT } from "./AccountChoiceConfig.ts";

type AccountChoiceLayoutComponents = {
    title: Text;
    accountButtons: Text[];
};

export function layout(components: AccountChoiceLayoutComponents, screen: ScreenSize): void
{
    components.title.anchor.set(ACCOUNT_CHOICE_LAYOUT.title.anchor.x, ACCOUNT_CHOICE_LAYOUT.title.anchor.y);
    components.title.position.set(
        screen.width * ACCOUNT_CHOICE_LAYOUT.title.position.xRatio,
        screen.height * ACCOUNT_CHOICE_LAYOUT.title.position.yRatio +
        ACCOUNT_CHOICE_LAYOUT.title.position.yOffset
    );

    components.accountButtons.forEach((button, index) =>
    {
        button.anchor.set(ACCOUNT_CHOICE_LAYOUT.accounts.anchor.x, ACCOUNT_CHOICE_LAYOUT.accounts.anchor.y);
        button.position.set(
            screen.width / 2 + ACCOUNT_CHOICE_LAYOUT.accounts.xOffsets[index],
            screen.height * ACCOUNT_CHOICE_LAYOUT.accounts.position.yRatio
        );
    });
}