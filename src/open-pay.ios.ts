// declare const Openpay: any;

export class OpenPay {
    private merchantId: string;
    private apiKey: string;
    private productionMode: boolean;

    public setup(merchantId, apiKey, productionMode) {
        this.merchantId = merchantId;
        this.apiKey = apiKey;
        this.productionMode = productionMode;
    }

    public createToken(card: Card): Promise<any> {
        let openpay = Openpay.alloc().initWithMerchantIdApyKeyIsProductionMode(
            this.merchantId,
            this.apiKey,
            this.productionMode
        );

        let sessionId = openpay.createDeviceSessionId();
        return new Promise(function(resolve, reject) {
            let openPayCard = null;
            try {
                openPayCard = OPCard.alloc().init();
                openPayCard.holderName = card.holderName;
                openPayCard.number = card.cardNumber;
                openPayCard.expirationMonth = card.expirationMonth;
                openPayCard.expirationYear = card.expirationYear;
                openPayCard.cvv2 = card.cvv2;
            } catch (error) {
                reject(error);
            }

            openpay.createTokenWithCardSuccessFailure(
                openPayCard,
                function(token: OPToken) {
                    let response = {
                        id: token.id,
                        sessionId: sessionId
                    };

                    resolve(response);
                },
                function(error) {
                    reject(error);
                }
            );
        });
    }
}

export interface Card {
    holderName: string;
    cardNumber: string;
    expirationMonth: string;
    expirationYear: string;
    cvv2: string;
}
