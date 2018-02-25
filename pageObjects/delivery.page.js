const {Selector} = require("testcafe")
const Base = require("./base.page")
const PaymentPage = require("./payment.page")

module.exports = class DeliveryPage extends Base {
    constructor() {
        super()
        this.pageTitle = "Delivery Page (Checkout V2)"
        this.characteristicPageElements = [this.proceedToPaymentButton]
    }

    get proceedToPaymentButton() {
        return Selector(".DeliveryContainer-nextButton").with({
            boundTestRun: testController
        })
    }

    get homeExpressButton() {
        return Selector(
            '.FormComponent-deliveryMethod[for="delivery-method-home_express"]'
        ).with({
            boundTestRun: testController
        })
    }

    get homeExpressRadioButton() {
        return Selector("#delivery-method-home_express").with({
            boundTestRun: testController
        })
    }

    get manualEntryCountryDropdown() {
        return Selector('[aria-label="Delivery country"]').with({
            boundTestRun: testController
        })
    }

    get manualEntryCountryDropdownOptions() {
        return this.manualEntryCountryDropdown.find("option")
    }

    get manualEntryAddressLineOneInput() {
        return Selector(".Input-field-address1").with({
            boundTestRun: testController
        })
    }

    get manualEntryPostCodeInput() {
        return Selector(".Input-field-postcode").with({
            boundTestRun: testController
        })
    }

    get manualEntryCityInput() {
        return Selector(".Input-field-city").with({
            boundTestRun: testController
        })
    }

    get firstNameInput() {
        return Selector(".Input-field-firstName").with({
            boundTestRun: testController
        })
    }

    get lastNameInput() {
        return Selector(".Input-field-lastName").with({
            boundTestRun: testController
        })
    }

    get phoneNumberInput() {
        return Selector(".Input-field-telephone").with({
            boundTestRun: testController
        })
    }

    async chooseHomeExpress() {
        await testController
            .click(this.homeExpressButton)
            .expect(await this.disappearedLoadingOverlay.exists)
            .ok("The loading overlay didn't disappear in time. Sorry!")
            .expect(await this.homeExpressRadioButton.checked)
            .ok("The Home Express radio button isn't checked.")
    }

    async provideDeliveryDetailsManually(country) {
        await testController
            .click(this.manualEntryCountryDropdown)
            .click(this.manualEntryCountryDropdownOptions.withText(country))
            .expect(this.manualEntryCountryDropdown.value)
            .eql(
                country,
                "The country option from the dropdown hasn't been selected properly."
            )
            .typeText(this.firstNameInput, "Testy")
            .expect(this.firstNameInput.value)
            .eql(
                "Testy",
                "The first name field hasn't been populated properly."
            )
            .typeText(this.lastNameInput, "McTest")
            .expect(this.lastNameInput.value)
            .eql(
                "McTest",
                "The last name field hasn't been populated properly."
            )
            .typeText(this.phoneNumberInput, "0987654321")
            .expect(this.phoneNumberInput.value)
            .eql(
                "0987654321",
                "The phpone number field hasn't been populated properly."
            )
            .typeText(this.manualEntryAddressLineOneInput, "Sesame Street")
            .expect(this.manualEntryAddressLineOneInput.value)
            .eql(
                "Sesame Street",
                "The address line 1 field hasn't been populated properly."
            )
            .typeText(this.manualEntryCityInput, "Oz")
            .expect(this.manualEntryCityInput.value)
            .eql("Oz", "The city field hasn't been populated properly.")

        if (country === "United States") {
            await testController
                .typeText(this.manualEntryPostCodeInput, "90210")
                .expect(this.manualEntryPostCodeInput.value)
                .eql(
                    "90210",
                    "The post code field hasn't been populated properly."
                )
        }
    }

    async proceedToPayment() {
        await testController.click(this.proceedToPaymentButton)
        const paymentpage = new PaymentPage()
        await paymentpage.waitToBeLoaded()
    }
}
