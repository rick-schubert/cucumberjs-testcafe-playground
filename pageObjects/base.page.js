const {Selector} = require("testcafe")
const emojic = require("emojic")

module.exports = class Base {
    constructor() {
        this.pageTitle = "Undefined (base class)"
        this.characteristicPageElements = []
    }

    get disappearedLoadingOverlay() {
        return Selector('.LoaderOverlay[aria-busy="false"]').with({
            boundTestRun: testController
        })
    }

    async waitToBeLoaded() {
        this.characteristicPageElements.forEach(async (element) => {
            await testController
                .expect(element.exists)
                .ok(
                    `${this.pageTitle} didn't fully load. Call trace above. ${emojic.dizzyFace}}`
                ).catch((err) => {
                    console.log(emojic.dizzyFace,emojic.dizzyFace,emojic.dizzyFace)
                    err.callsite.stackFrames.forEach((errorStack) => {
                        console.error(errorStack.toString())
                    })
                })
        })
    }
}
