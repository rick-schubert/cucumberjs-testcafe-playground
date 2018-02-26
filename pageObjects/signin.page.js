const browser = require("./../clienthelpers")
const uuid = require("uuid-random")
const {Selector} = require("./../features/support/testcafewrappers")
const DeliveryPage = require("./delivery.page")

module.exports = class SignIn {
    get newCustomerEmailAddressInput() {
        return Selector(".Register-form .Input-field-email")
    }

    get newCustomerPasswordInput() {
        return Selector(".Register-form .Input-field-password")
    }

    get newCustomerPasswordConfirmInput() {
        return Selector(".Register-form .Input-field-passwordConfirm")
    }

    get newCustomerRegisterButton() {
        return Selector(".Register-saveChanges")
    }

    async registerDuringCheckout() {
        await testController
            .typeText(this.newCustomerEmailAddressInput, `${uuid()}@random.com`)
            .typeText(this.newCustomerPasswordInput, "monty1")
            .typeText(this.newCustomerPasswordConfirmInput, "monty1")
            .click(this.newCustomerRegisterButton)
        const deliverypage = new DeliveryPage()
        await deliverypage.waitToBeLoaded()
    }
}
