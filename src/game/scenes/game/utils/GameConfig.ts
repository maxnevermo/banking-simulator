export const GAME_OPTIONS = [
    { label: "1. Top up card", buttonId: "top-up" },
    { label: "2. Withdraw cash", buttonId: "withdraw" },
    { label: "3. Pay Utilities", buttonId: "utilities" },
    { label: "4. Pay Loan", buttonId: "loans" }
] as const;

export const GAME_STYLE = {
    option: {
        fill: "#FFFFFF",
        fontFamily: "VPPixel",
        fontSize: 60
    }
} as const;

export const GAME_CONFIG = {
    button: {
        eventMode: "static",
        cursor: "pointer"
    }
} as const;

export const GAME_LAYOUT = {
    terminalScreen: {
        leftXRatio: 0.12,
        rightXRatio: 0.89,
        topYRatio: 0.28,
        bottomYRatio: 0.66
    },
    options: {
        anchor: {
            leftColumn: {
                x: 0,
                y: 0.5
            },
            rightColumn: {
                x: 1,
                y: 0.5
            }
        }
    },
    buttons: {
        leftXRatio: 0.08,
        rightXRatio: 0.92,
        anchor: {
            x: 0.5,
            y: 0.5
        },
        scale: 0.1
    }
} as const;