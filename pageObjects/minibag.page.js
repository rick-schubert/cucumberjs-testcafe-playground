const browser = require("./../clienthelpers")
const {Selector} = require("./../features/support/testcafewrappers")

module.exports = class MiniBag {
    get checkoutNowButton() {
        return Selector(".Button.MiniBag-continueButton")
    }

    async goToCheckout() {
        await testController
            .expect(this.checkoutNowButton.exists)
            .ok("Couldn't locate the checkout now button.")
            .click(this.checkoutNowButton)
    }
}
