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
            .expect(this.newCustomerEmailAddressInput.exists)
            .ok("The new cumster email address input wasn't found.")
            .typeText(this.newCustomerEmailAddressInput, `${uuid()}@random.com`)
            .expect(this.newCustomerPasswordInput.exists)
            .ok("The new customer password input wasn't found.")
            .typeText(this.newCustomerPasswordInput, "monty1")
            .expect(this.newCustomerPasswordConfirmInput.exists)
            .ok("The new customer password confirm input wasn't found.")
            .typeText(this.newCustomerPasswordConfirmInput, "monty1")
            .expect(this.newCustomerRegisterButton.exists)
            .ok("The new customer register button wasn't found.")
            .click(this.newCustomerRegisterButton)
        const deliverypage = new DeliveryPage()
        await deliverypage.waitToBeLoaded()
    }
}
