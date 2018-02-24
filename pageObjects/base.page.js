const {Selector} = require("testcafe")

module.exports = class Base {
    get disappearedLoadingOverlay() {
        return Selector(".LoaderOverlay[aria-busy=\"false\"]").with({
            boundTestRun: testController
        })
    }
}
