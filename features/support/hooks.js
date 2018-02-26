const fs = require("fs")
const createTestCafe = require("testcafe")
const testControllerHolder = require("../support/testControllerHolder")
const stream = fs.createWriteStream('report.json');
var {
    AfterAll,
    BeforeAll,
    setDefaultTimeout,
    Before,
    After,
    Status
} = require("cucumber")

var testcafe = null
var TIMEOUT = 40000
var n = 0

function createTestFile() {
    fs.writeFileSync(
        "test.js",
        'import testControllerHolder from "./features/support/testControllerHolder.js";\n\n' +
        'fixture("")\n' +
        'test("", testControllerHolder.capture)'
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
                .screenshots("./screenshots", true)
                .reporter("list", stream)
                .run({
                    skipJsErrors: true,
                    selectorTimeout: TIMEOUT,
                    assertionTimeout: TIMEOUT,
                    debugOnFail: true
                })
                .then(() => {
                    stream.end()
                })
                .catch(function(error) {
                    console.log(error)
                })
        })
        .then(async function(report) {
            console.log("QARS report", report)
            // testcafe.close()
            await testController.debug()
        })
}

setDefaultTimeout(TIMEOUT)

BeforeAll(function() {})

Before(function() {
    runTest(n)
    createTestFile()
    n += 2
    return this.waitForTestController
})

After(function() {
    fs.unlinkSync("test.js")
    // await testController.takeScreenshot()
    testControllerHolder.free()
})

AfterAll(function() {})
