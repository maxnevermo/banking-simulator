export class HandlerResult
{
    private constructor(readonly success: boolean,
                        readonly message: string)
    {
    }

    static success(): HandlerResult
    {
        return new HandlerResult(true, "");
    }

    static failure(message: string): HandlerResult
    {
        return new HandlerResult(false, message);
    }
}
