const fs = require("fs")
const createTestCafe = require("testcafe")
const testControllerHolder = require("../support/testControllerHolder")
var {
    AfterAll,
    BeforeAll,
    setDefaultTimeout,
    Before,
    After,
    Status
} = require("cucumber")

var testcafe = null
var TIMEOUT = 25000
var n = 0

function createTestFile() {
    fs.writeFileSync(
        "test.js",
        'import testControllerHolder from "./features/support/testControllerHolder.js";\n\n' +
            'fixture("fixture")\n' +
            'test("test", testControllerHolder.capture)'
    )
}

function runTest(iteration) {
    var runner = null

    createTestCafe("localhost", 1338 + iteration, 1339 + iteration)
        .then(function(tc) {
            testcafe = tc
            runner = tc.createRunner()
            return runner
                .src("./test.js")
                .browsers("chrome")
                .screenshots("./../../screenshots")
                .run({skipJsErrors: true, selectorTimeout: TIMEOUT, assertionTimeout: TIMEOUT})
                .catch(function(error) {
                    console.log(error)
                })
        })
        .then(function(report) {
            console.log(report)
            testcafe.close()
        })
}

// Disable cucumber timeout to gain access to testcafe timeout reporting
setDefaultTimeout(-1)

BeforeAll(function() {})

Before(function() {
    runTest(n)
    createTestFile()
    n += 2
    return this.waitForTestController
})

After(function() {
    fs.unlinkSync("test.js")
    testController.takeScreenshot()
    testControllerHolder.free()
    testcafe.close()
})

AfterAll(function() {})
