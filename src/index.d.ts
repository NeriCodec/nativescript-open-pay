export declare class OpenPay {
    public setup(
        merchantId: string,
        apiKey: string,
        productionMode: boolean
    );

    public createToken(card: Card): Promise<any>;
}

export interface Card {
    holderName: string;
    cardNumber: string;
    expirationMonth: string;
    expirationYear: string;
    cvv2: string;
}
