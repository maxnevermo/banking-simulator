export const MAIN_MENU_COPY = {
    title: "Banking simulator",
    playButton: "Play"
} as const;

export const MAIN_MENU_STYLE = {
    base: {
        fontFamily: "VPPixel",
        fill: "#FFFFFF",
        fontSize: 80
    },
    title: {
        fontWeight: "bold",
        fontStyle: "italic",
        dropShadow: {
            color: "#dcdcdc"
        }
    }
} as const;

export const MAIN_MENU_LAYOUT = {
    title: {
        anchor: {
            x: 0.5,
            y: 0
        },
        position: {
            xRatio: 0.5,
            y: 100
        }
    },
    playButton: {
        anchor: {
            x: 0.5,
            y: 0
        },
        position: {
            xRatio: 0.5,
            yRatio: 0.5
        }
    }
} as const;