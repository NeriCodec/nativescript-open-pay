import * as app from "tns-core-modules/application";

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
        let openPay = new mx.openpay.android.Openpay(
            this.merchantId,
            this.apiKey,
            new java.lang.Boolean(this.productionMode)
        );

        return new Promise(function(resolve, reject) {
            let openPayCard = null;
            try {
                openPayCard = new mx.openpay.android.model.Card();
                openPayCard.setHolderName(card.holderName);
                openPayCard.setCardNumber(card.cardNumber);
                openPayCard.setExpirationMonth(card.expirationMonth);
                openPayCard.setExpirationYear(card.expirationYear);
                openPayCard.setCvv2(card.cvv2);
            } catch (error) {
                reject(error);
            }

            let activity =
                app.android.startActivity ||
                app.android.foregroundActivity;

            let sessionId = openPay
                .getDeviceCollectorDefaultImpl()
                .setup(activity);

            openPay.createToken(
                openPayCard,
                new mx.openpay.android.OperationCallBack({
                    onSuccess: function(
                        operationResult: mx.openpay.android.OperationResult<
                            any
                        >
                    ) {
                        //Handlo in success
                        let response = {
                            id: operationResult.getResult().getId(),
                            sessionId: sessionId
                        };

                        resolve(response);
                    },
                    onError: function(
                        openpayServiceException: mx.openpay.android.exceptions.OpenpayServiceException
                    ) {
                        //Handle Error
                        console.dir(openpayServiceException);
                        reject(openpayServiceException);
                    },
                    onCommunicationError: function(
                        serviceUnavailableException: mx.openpay.android.exceptions.ServiceUnavailableException
                    ) {
                        //Handle communication error
                        console.dir(serviceUnavailableException);
                        reject(serviceUnavailableException);
                    }
                })
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
