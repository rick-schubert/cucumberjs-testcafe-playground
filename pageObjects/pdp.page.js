const browser = require("./../clienthelpers")
const {Selector} = require("testcafe")

module.exports = class PDP {
    get addToBagButton() {
        return Selector(".AddToBag").with({boundTestRun: testController})
    }

    get nonexistingelement() {
        return Selector(".thisdoesntexist").with({boundTestRun: testController})
    }

    get addToBagConfirmationModalCloseIcon() {
        return Selector(".Modal-closeIcon").with({boundTestRun: testController})
    }

    get pageLoadErrorMsg() {
        return "The PDP either didn't fully load or it couldn't navigate to it."
    }

    async awaitFullyLoaded() {
        console.log("PDP: Waiting for page to fully load")
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
