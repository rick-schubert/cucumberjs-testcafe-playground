const browser = require("./../clienthelpers")
const {Selector} = require("testcafe")

module.exports = class MiniBag {
    get checkoutNowButton() {
        return Selector(".Button.MiniBag-continueButton").with({
            boundTestRun: testController
        })
    }

    async goToCheckout() {
        await testController.click(this.checkoutNowButton)
    }
}
