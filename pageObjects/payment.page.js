const {Selector} = require("./../features/support/testcafewrappers")
const PaymentPage = require("./payment.page")
const Base = require("./base.page")

module.exports = class PaymentPage extends Base {
    constructor() {
        super()
        this.pageTitle = "Payment Page (Checkout V2)"
        this.characteristicPageElements = [this.orderNowButton]
    }

    get orderNowButton() {
        return Selector(".PaymentContainer-paynow")
    }

    get creditCardNumberInput() {
        return Selector(".Input-field-cardNumber")
    }

    get creditCardCvvInput() {
        return Selector(".Input-field-cvv")
    }

    get creditCardExpiryMonthDropdown() {
        return Selector('.Select-select[name="expiryMonth"]')
    }

    get creditCardExpiryMonthDropdownOptions() {
        return this.creditCardExpiryMonthDropdown.find("option")
    }

    get creditCardExpiryYearDropdown() {
        return Selector('.Select-select[name="expiryYear"]')
    }

    get creditCardExpiryYearDropdownOptions() {
        return this.creditCardExpiryYearDropdown.find("option")
    }

    get acceptTermsAndConditionsCheckboxSpan() {
        return Selector(
            ".FormComponent-isAcceptedTermsAndConditions .Checkbox-check"
        )
    }

    get acceptTermsAndConditionsCheckboxInput() {
        return Selector(
            ".FormComponent-isAcceptedTermsAndConditions input"
        )
    }

    async enterCreditCardDetails(paymentDetails) {
        await testController
            .typeText(this.creditCardNumberInput, paymentDetails["Card Number"])
            .expect(this.creditCardNumberInput.value)
            .eql(
                paymentDetails["Card Number"],
                "The credit card input hasn't been populated properly."
            )
            .click(this.creditCardExpiryMonthDropdown)
            .click(
                this.creditCardExpiryMonthDropdownOptions.withText(
                    paymentDetails["Expiry Month"]
                )
            )
            .expect(this.creditCardExpiryMonthDropdown.value)
            .eql(
                paymentDetails["Expiry Month"],
                "The expiry month option from the dropdown hasn't been selected properly."
            )
            .click(this.creditCardExpiryYearDropdown)
            .click(
                this.creditCardExpiryYearDropdownOptions.withText(
                    paymentDetails["Expiry Year"]
                )
            )
            .expect(this.creditCardExpiryYearDropdown.value)
            .eql(
                paymentDetails["Expiry Year"],
                "The expiry year option from the dropdown hasn't been selected properly."
            )
            .typeText(this.creditCardCvvInput, paymentDetails["CVV"])
            .expect(this.creditCardCvvInput.value)
            .eql(
                paymentDetails["CVV"],
                "The CVV input hasn't been populated properly."
            )
    }

    async acceptTermsAndConditions() {
        await testController
            .click(this.acceptTermsAndConditionsCheckboxSpan)
            .expect(this.acceptTermsAndConditionsCheckboxInput.checked)
            .ok(
                "It looks like it couldn't tick the checkbox to accept the terms and conditions."
            )
    }

    async placeOrder() {
        await testController.click(this.orderNowButton)
    }
}
