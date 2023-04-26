interface IEmailArguments {
    email: string;
    text: string;
    subject: string;
}
export declare function sendEmail(args: IEmailArguments): Promise<unknown>;
export {};
