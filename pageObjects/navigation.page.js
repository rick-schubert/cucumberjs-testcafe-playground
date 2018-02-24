const browser = require("./../clienthelpers")
const config = require("./../config")
const {Selector} = require("testcafe")
const PDP = require("./pdp.page")
const routes = require("./../features/support/constants/routes")

module.exports = class Navigation {
    get mobileSearchButton() {
        return Selector(".Header-searchButton").with({
            boundTestRun: testController
        })
    }
    get searchInput() {
        return Selector(".SearchBar-queryInput").with({
            boundTestRun: testController
        })
    }

    get desktopMiniBagIcon() {
        return Selector(".ShoppingCart").with({boundTestRun: testController})
    }

    get mobileMiniBagIcon() {
        return Selector(".Header-shoppingCartIconbutton").with({
            boundTestRun: testController
        })
    }

    async search(searchTerm) {
        if (config.breakpoint === "mobile") {
            await testController.click(this.mobileSearchButton)
        }
        await testController
            .typeText(this.searchInput, searchTerm)
            .expect(this.searchInput.value)
            .eql(
                searchTerm,
                "Navigation search input: The search term doesn't show on the input."
            )
        await testController.pressKey("enter")
        const pdp = new PDP()
        await pdp.awaitFullyLoaded()
    }

    async openMiniBag() {
        if (config.breakpoint === "desktop") {
            await testController.click(this.desktopMiniBagIcon)
        }
        if (config.breakpoint === "mobile") {
            await testController.click(this.mobileMiniBagIcon)
        }
    }
}
