const cucumberHtmlReporter = require('cucumber-html-reporter');

    cucumberHtmlReporter.generate({
        theme: 'bootstrap',
        jsonFile: './report/cucumber_report.json',
        output: './report/cucumber_report.html',
        reportSuiteAsScenarios: true,
        launchReport: true
    });
