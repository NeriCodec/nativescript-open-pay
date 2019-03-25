import { Observable } from "tns-core-modules/data/observable";
import { OpenPay, Card } from "nativescript-open-pay";
import * as dialogs from "tns-core-modules/ui/dialogs";

export class HelloWorldModel extends Observable {
    private openPay: OpenPay;

    constructor() {
        super();

        this.openPay = new OpenPay();
        this.openPay.setup(
            "mu1hweksxaapkdwpvjjb",
            "pk_43244f7c21124764ba711d337d738f6e",
            false
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
                // dialogs.alert(JSON.parse(args));
            })
            .catch(function(error) {
                console.log(error);
                dialogs.alert(error);
            });
    }
}
