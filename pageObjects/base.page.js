const {Selector} = require("testcafe")

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
                .expect(await element.exists)
                .ok(
                    `${
                        this.pageTitle
                    }: Couldn't be fully loaded. Couldn't find ${element.node}`
                )
        })
    }
}
