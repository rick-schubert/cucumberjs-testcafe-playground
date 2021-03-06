const {Given, When, Then} = require("cucumber")
const {ClientFunction} = require("testcafe")
const buildStartingUrl = require("./helpers/buildStartingUrl")
const Navigation = require("./../../pageObjects/navigation.page")
const PDP = require("./../../pageObjects/pdp.page")
const MiniBag = require("./../../pageObjects/minibag.page")
const SignIn = require("./../../pageObjects/signin.page")
const DeliveryPage = require("./../../pageObjects/delivery.page")
const PaymentPage = require("./../../pageObjects/payment.page")
const ThankYouPage = require("./../../pageObjects/thankyou.page")

Given("I start on a page", async (table) => {
    const startingOpts = table.hashes()[0]
    await testController.navigateTo(buildStartingUrl(startingOpts))
    await ClientFunction(() => {
        document.cookie = 'featuresOverride={"FEATURE_NEW_CHECKOUT":true}'
        location.reload()
    }).with({boundTestRun: testController})()
})

When("I search for a product code", async () => {
    const navBar = new Navigation()
    await navBar.search("24R08NRED")
})

When("I add the product to the bag", async () => {
    const pdp = new PDP()
    await pdp.addProductToBag()
})

When("I dismiss the add to bag confirmation modal", async () => {
    const pdp = new PDP()
    await pdp.dismissAddToBagConfirmationModal()
})

When("I view the bag", async () => {
    const navBar = new Navigation()
    await navBar.openMiniBag()
})

When("I proceed to checkout from the {string}", async (location) => {
    if (location === "minibag") {
        const minibag = new MiniBag()
        await minibag.goToCheckout()
    }
})

When("I register {string}", async (checkoutChoice) => {
    const signinpage = new SignIn()
    await signinpage.registerDuringCheckout()
})

When("I choose {string} as the delivery option", async (deliveryOption) => {
    const deliverypage = new DeliveryPage()
    if (deliveryOption === "Home Express") {
        await deliverypage.chooseHomeExpress()
    }
})

When("I enter my delivery address", async (table) => {
    const stepOptions = table.hashes()[0]
    const deliverypage = new DeliveryPage()
    if (stepOptions["Entry Method"] === "manual") {
        await deliverypage.provideDeliveryDetailsManually(stepOptions.Country)
    }
})

When("I proceed to payment", async () => {
    const deliverypage = new DeliveryPage()
    await deliverypage.proceedToPayment()
})

When("I enter my credit card details", async (table) => {
    const creditCardDetails = table.hashes()[0]
    const paymentpage = new PaymentPage()
    await paymentpage.enterCreditCardDetails(creditCardDetails)
})

When("I accept the terms and conditions", async () => {
    const paymentpage = new PaymentPage()
    await paymentpage.acceptTermsAndConditions()
})

When("I place the order", async () => {
    const paymentpage = new PaymentPage()
    await paymentpage.placeOrder()
})

Then("I see the confirmation for my order", async () => {
    const thankyoupage = new ThankYouPage()
    await thankyoupage.waitToBeLoaded()
})
