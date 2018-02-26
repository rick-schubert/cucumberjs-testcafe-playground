const browser = require("./../clienthelpers")
const {Selector} = require("./../features/support/testcafewrappers")
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
        return Selector(".AddToBag")
    }

    get nonexistingelement() {
        return Selector(".thisdoesntexist")
    }

    get addToBagConfirmationModalCloseIcon() {
        return Selector(".Modal-closeIcon")
    }

    async addProductToBag() {
        await testController.click(this.addToBagButton)
    }

    async dismissAddToBagConfirmationModal() {
        await testController.click(this.addToBagConfirmationModalCloseIcon)
    }
}
