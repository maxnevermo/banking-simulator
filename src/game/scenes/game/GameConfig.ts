import {
    OperationType
} from "../../../banking/transactions/OperationType.ts";

export const GAME_OPTIONS = [
    {
        label: "Top up card",
        buttonId: "top-up",
        operation: OperationType.TOP_UP
    },
    {
        label: "Withdraw cash",
        buttonId: "withdraw",
        operation: OperationType.WITHDRAW
    },
    {
        label: "Pay Utilities",
        buttonId: "utilities",
        operation: OperationType.UTILITIES
    },
    {
        label: "Pay Loan",
        buttonId: "loans",
        operation: OperationType.LOANS
    }
] as const;

export const GAME_STYLE = {
    baseText: {
        fill: "#FFFFFF",
        fontFamily: "VPPixel"
    },
    option: {
        fontSize: 60
    },
    balance: {
        fontSize: 38
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
    },
    balances: {
        card: {
            xRatio: 0.5,
            yRatio: 0.12
        },
        cash: {
            xRatio: 0.5,
            yRatio: 0.18
        },
        anchor: {
            x: 0.5,
            y: 0.5
        }
    }
} as const;