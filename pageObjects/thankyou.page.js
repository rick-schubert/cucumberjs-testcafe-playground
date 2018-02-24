const {Selector} = require("testcafe")
const Base = require("./base.page")

module.exports = class ThankYou extends Base {
    constructor() {
        super()
    }

    get continueShoppingCTA() {
        return Selector(".SummaryCompleted-button").with({boundTestRun: testController})
    }

    async awaitFullyLoaded() {
        await testController
            .expect(await this.disappearedLoadingOverlay())
            .ok("The loading overlay didn't disappear in time. Sorry!")
            .expect(await this.continueShoppingCTA())
            .ok(this.pageLoadErrorMsg)
    }
}
