# Openpay ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

## Support

Support Android & iOS.

## Installation

```javascript
tns plugin add nativescript-open-pay
```

## Usage

In the demo you will find a test token to test quickly

```javascript
import { Observable } from "tns-core-modules/data/observable";
import { OpenPay, Card } from "nativescript-open-pay";

export class HelloWorldModel extends Observable {
    private openPay: OpenPay;

    constructor() {
        super();

        this.openPay = new OpenPay();
        this.openPay.setup(
            "merchant_id", // merchantId
            "api_key", // apiKey
            false // ProductionMode Sandbox = false
        );

        let card: Card = {
            holderName: "Juan Perez Ramirez",
            cardNumber: "4111111111111111",
            expirationMonth: "12",
            expirationYear: "20",
            cvv2: "110"
        };

        this.openPay
            .createToken(card)
            .then(function(args) {
                console.dir(args);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

```

## License

Apache License Version 2.0, January 2004
