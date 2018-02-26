const {Selector} = require("./../features/support/testcafewrappers")
const emojic = require("emojic")

module.exports = class Base {
    constructor() {
        this.pageTitle = "Base class"
        this.characteristicPageElements = []
    }

    get disappearedLoadingOverlay() {
        return Selector('.LoaderOverlay[aria-busy="false"]')
    }

    async waitToBeLoaded() {
        this.characteristicPageElements.forEach(async (element) => {
            await testController
                .expect(element.exists)
                .ok(
                    `${this.pageTitle} didn't fully load. See call trace above.`
                ).catch((err) => {
                    console.log(emojic.dizzyFace,emojic.dizzyFace,emojic.dizzyFace)
                    err.callsite.stackFrames.forEach((errorStack) => {
                        console.error(errorStack.toString())
                    })
                })
        })
    }
}
