const {Selector} = require("testcafe")
const Base = require("./base.page")

module.exports = class ThankYou extends Base {
    constructor() {
        super()
        this.pageTitle = "Thank You Page"
        this.characteristicPageElements = [
            this.disappearedLoadingOverlay,
            this.continueShoppingCTA
        ]
    }

    get continueShoppingCTA() {
        return Selector(".SummaryCompleted-button").with({
            boundTestRun: testController
        })
    }
}
