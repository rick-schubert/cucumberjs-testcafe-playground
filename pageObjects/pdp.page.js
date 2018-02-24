const browser = require("./../clienthelpers")
const {Selector} = require("testcafe")

module.exports = class PDP {
    constructor() {
        this.pageLoadErrorMsg = "The PDP either didn't fully load or it couldn't navigate to it."
    }

    get addToBagButton() {
        return Selector(".AddToBag").with({boundTestRun: testController})
    }

    get nonexistingelement() {
        return Selector(".thisdoesntexist").with({boundTestRun: testController})
    }

    get addToBagConfirmationModalCloseIcon() {
        return Selector(".Modal-closeIcon").with({boundTestRun: testController})
    }

    async awaitFullyLoaded() {
        await testController
            .expect(await this.addToBagButton())
            .ok(this.pageLoadErrorMsg)
        // Use to verify that the loading mechanism actually works
        // await testController
        //     .expect(this.nonexistingelement.exists)
        //     .ok(this.pageLoadErrorMsg)
    }

    async addProductToBag() {
        await testController.click(this.addToBagButton)
    }

    async dismissAddToBagConfirmationModal() {
        await testController.click(this.addToBagConfirmationModalCloseIcon)
    }
}
