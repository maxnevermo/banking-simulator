import { OperationType } from "../transactions/OperationType.ts";

export abstract class Command
{
    constructor(
        private readonly operationType: OperationType
    )
    {
    }

    getOperationType(): OperationType
    {
        return this.operationType;
    }

    abstract execute(): void;
}