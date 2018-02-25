const browser = require("./../clienthelpers")
const {Selector} = require("testcafe")
const Base = require("./base.page")

module.exports = class PDP extends Base {
    constructor() {
        super()
        this.pageTitle = "PDP"
        this.characteristicPageElements = [
            this.addToBagButton,
            this.nonexistingelement
        ]
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

    async addProductToBag() {
        await testController.click(this.addToBagButton)
    }

    async dismissAddToBagConfirmationModal() {
        await testController.click(this.addToBagConfirmationModalCloseIcon)
    }
}
