const browser = require("./../clienthelpers")
const {Selector} = require("./../features/support/testcafewrappers")

module.exports = class MiniBag {
    get checkoutNowButton() {
        return Selector(".Button.MiniBag-continueButton")
    }

    async goToCheckout() {
        await testController.click(this.checkoutNowButton)
    }
}
