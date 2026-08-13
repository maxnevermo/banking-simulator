import { Application } from "pixi.js";
import { Scene } from "../Scene.ts";
import { AssetManager } from "../../AssetManager.ts";
import { GameSceneView } from "./GameSceneView.ts";
import {
    BankingGameService
} from "../../services/banking-service/BankingGameService.ts";
import {
    TransactionNotificationService
} from "../../services/notification-service/TransactionNotificationService.ts";
import {
    GameFlowController
} from "./GameFlowController.ts";

export class GameScene extends Scene
{
    private gameView!: GameSceneView;
    private transactionFlow!: GameFlowController;

    constructor(
        private readonly app: Application,
        private readonly bankingService: BankingGameService
    )
    {
        super();
    }

    public async init(): Promise<void>
    {
        const gameTextures = await AssetManager.loadGameAssets();

        this.gameView = new GameSceneView({
            screen: this.app.screen,
            backgroundTexture: gameTextures.background,
            buttonTexture: gameTextures.button,
            userBalances: this.bankingService.getUserBalances(),
            onOptionClick: (operation) =>
            {
                this.transactionFlow.openAccountChoiceOverlay(operation);
            }
        });

        this.transactionFlow = new GameFlowController({
            screen: this.app.screen,
            overlayParent: this,
            bankingService: this.bankingService,
            gameView: this.gameView,
            notificationService: new TransactionNotificationService()
        });

        this.addChild(this.gameView);
    }
}