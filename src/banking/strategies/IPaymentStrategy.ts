export interface IPaymentStrategy
{
    pay(amount: number): void;
}

export interface IPaymentRefillableStrategy extends IPaymentStrategy
{
    topUp(amount: number): void;
    withdraw(amount: number): void;
}