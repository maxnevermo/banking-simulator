import {
    AccountType
} from "../../../banking/account/AccountType.ts";

export const ACCOUNT_CHOICE_COPY = {
    title: "Choose account",
    accounts: [
        {
            label: "Card",
            value: AccountType.CARD
        },
        {
            label: "Cash",
            value: AccountType.CASH
        }
    ]
} as const;

export const ACCOUNT_CHOICE_STYLE = {
    backdrop: {
        color: 0x000000,
        alpha: 0.7
    },
    baseText: {
        fill: "#FFFFFF",
        fontFamily: "VPPixel"
    },
    title: {
        fontSize: 48
    },
    accountButton: {
        fontSize: 44
    }
} as const;

export const ACCOUNT_CHOICE_LAYOUT = {
    title: {
        anchor: {
            x: 0.5,
            y: 0.5
        },
        position: {
            xRatio: 0.5,
            yRatio: 0.5,
            yOffset: -120
        }
    },
    accounts: {
        anchor: {
            x: 0.5,
            y: 0.5
        },
        position: {
            yRatio: 0.5
        },
        xOffsets: [-120, 120]
    }
} as const;