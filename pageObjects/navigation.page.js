const browser = require("./../clienthelpers")
const config = require("./../config")
const {Selector} = require("./../features/support/testcafewrappers")
const PDP = require("./pdp.page")

module.exports = class Navigation {
    get mobileSearchButton() {
        return Selector(".Header-searchButton")
    }
    get searchInput() {
        return Selector(".SearchBar-queryInput")
    }

    get desktopMiniBagIcon() {
        return Selector(".ShoppingCart")
    }

    get mobileMiniBagIcon() {
        return Selector(".Header-shoppingCartIconbutton")
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
        await pdp.waitToBeLoaded()
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
