const {Selector} = require("testcafe")

// Since .with({boundTestRun: testController}) has to be attached to every single
// Selector to be used by testcafe in conjunction with cucumber, I created this
// easy to use wrapper around it
exports.Selector = (selector) =>
    Selector(selector).with({
        boundTestRun: testController
    })
