const browser = require("./../clienthelpers")
const {Selector} = require("testcafe")

module.exports = class DeliveryPage {
    get proceedToPaymentButton() {
        return Selector(".DeliveryContainer-nextButton").with({
            boundTestRun: testController
        })
    }

    get pageLoadErrorMsg() {
        return "The Delivery Page either didn't fully load or it couldn't navigate to it."
    }

    get homeExpressButton() {
        return Selector(".FormComponent-deliveryMethod[for=\"delivery-method-home_express\"]").with({
            boundTestRun: testController
        })
    }

    get homeExpressRadioButton() {
        return Selector("#delivery-method-home_express").with({
            boundTestRun: testController
        })
    }

    get disappearedLoadingOverlay() {
        return Selector(".LoaderOverlay[aria-busy=\"false\"]").with({
            boundTestRun: testController
        })
    }

    async awaitFullyLoaded() {
        await testController
        .expect(await this.proceedToPaymentButton())
        .ok(this.pageLoadErrorMsg)
    }

    async chooseHomeExpress() {
        await testController
        .click(this.homeExpressButton)
        .expect(await this.disappearedLoadingOverlay.exists)
        .ok("The loading overlay didn't disappear in time. Sorry!")
        .expect(await this.homeExpressRadioButton.checked)
        .ok("The Home Express radio button isn't checked.")

    }
}
