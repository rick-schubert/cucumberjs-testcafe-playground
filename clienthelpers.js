const {ClientFunction} = require("testcafe")

module.exports = {
    url: ClientFunction(() => window.location.href),
    title: ClientFunction(() => document.title),
    breakpoint: async () => {
        if (await ClientFunction(() => window.innerWidth < 768)) {
            return "mobile"
        } else {
            return "desktop"
        }
    },
    enableFeatures: ClientFunction(() => {
        document.cookie = `featuresOverride=\"${JSON.stringify({
            FEATURE_RESPONSIVE: true
        })}\"`
        location.reload()
    })
}
