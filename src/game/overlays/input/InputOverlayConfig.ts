export const INPUT_OVERLAY_COPY = {
    okButton: "OK"
} as const;

export const INPUT_OVERLAY_STYLE = {
    backdrop: {
        color: 0x000000,
        alpha: 0.7
    },
    baseText: {
        fill: 0xFFFFFF,
        fontFamily: "VPPixel"
    },
    title: {
        fontSize: 48
    },
    input: {
        width: 420,
        height: 70,
        radius: 8,
        backgroundColor: 0xFFFFFF,
        borderColor: 0x222222,
        borderWidth: 4,
        padding: 16,
        mask: true,
        text: {
            fill: "#000000",
            fontFamily: "VPPixel",
            fontSize: 32
        }
    },
    okButton: {
        fontSize: 48
    }
} as const;

export const INPUT_OVERLAY_LAYOUT = {
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
    input: {
        position: {
            xRatio: 0.5,
            yRatio: 0.5,
            xOffset: -210,
            yOffset: -35
        }
    },
    okButton: {
        anchor: {
            x: 0.5,
            y: 0.5
        },
        position: {
            xRatio: 0.5,
            yRatio: 0.5,
            yOffset: 100
        }
    }
} as const;