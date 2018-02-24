const browser = require("./../clienthelpers")
const uuid = require('uuid-random')
const {Selector} = require("testcafe")
const DeliveryPage = require("./delivery.page")

module.exports = class SignIn {
    get newCustomerEmailAddressInput() {
        return Selector(".Register-form .Input-field-email").with({
            boundTestRun: testController
        })
    }

    get newCustomerPasswordInput() {
        return Selector(".Register-form .Input-field-password").with({
            boundTestRun: testController
        })
    }

    get newCustomerPasswordConfirmInput() {
        return Selector(".Register-form .Input-field-passwordConfirm").with({
            boundTestRun: testController
        })
    }

    get newCustomerRegisterButton() {
        return Selector(".Register-saveChanges").with({
            boundTestRun: testController
        })
    }

    async registerDuringCheckout() {
        await testController
            .typeText(this.newCustomerEmailAddressInput, `${uuid()}@random.com`)
            .typeText(this.newCustomerPasswordInput, "monty1")
            .typeText(this.newCustomerPasswordConfirmInput, "monty1")
            .click(this.newCustomerRegisterButton)
        const deliverypage = new DeliveryPage()
        await deliverypage.awaitFullyLoaded()
    }
}
