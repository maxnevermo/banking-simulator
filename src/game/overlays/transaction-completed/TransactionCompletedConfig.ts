export const TRANSACTION_COMPLETED_COPY = {
    title: "Transaction completed",
    okButton: "OK",
    channels: [
        { label: "File", value: "file" },
        { label: "Email", value: "email" },
        { label: "Console", value: "console" }
    ]
} as const;

export const TRANSACTION_COMPLETED_STYLE = {
    backdrop: {
        color: 0x000000,
        alpha: 0.7
    },
    text: {
        fill: 0xFFFFFF,
        fontFamily: "VPPixel"
    },
    title: {
        fontSize: 48
    },
    message: {
        fontSize: 32
    },
    option: {
        fontSize: 32
    },
    checkbox: {
        size: 28,
        borderColor: 0xFFFFFF,
        selectedColor: 0xFFFFFF,
        borderWidth: 3,
        selectedPadding: 6
    },
    okButton: {
        fontSize: 48
    }
} as const;

export const TRANSACTION_COMPLETED_LAYOUT = {
    title: {
        anchor: {
            x: 0.5,
            y: 0.5
        },
        position: {
            xRatio: 0.5,
            yRatio: 0.25
        }
    },
    message: {
        anchor: {
            x: 0.5,
            y: 0.5
        },
        position: {
            xRatio: 0.5,
            yRatio: 0.36
        }
    },
    options: {
        position: {
            xRatio: 0.42,
            yRatio: 0.48
        },
        rowGap: 48,
        label: {
            position: {
                x: 44,
                y: -4
            }
        }
    },
    okButton: {
        anchor: {
            x: 0.5,
            y: 0.5
        },
        position: {
            xRatio: 0.5,
            yRatio: 0.75
        }
    }
} as const;