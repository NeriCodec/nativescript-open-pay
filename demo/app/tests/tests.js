var OpenPay = require("nativescript-open-pay").OpenPay;
var openPay = new OpenPay();

describe("greet function", function() {
    it("exists", function() {
        expect(openPay.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(openPay.greet()).toEqual("Hello, NS");
    });
});