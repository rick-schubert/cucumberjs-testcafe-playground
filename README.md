## Install
- `npm i -g testcafe`
- `npm install`
- Go into the folder **node_modules/testcafe** and change the stack-chain version inside of **package.json** to be `2.0.0.`
- Run `npm update` inside the testcafe folder

## How to Run
- `npm test`

## How to Debug a Failure with Testcafe
Inside `node_modules/.bin/cucumber-js`, add the `--inspect-brk` flag to the bash shebang, like so: `#!/usr/bin/env node --inspect-brk`. Set a `debugger` keyword whereever in your code you want the code to stop for debugging. Launch `chrome://inspect` to debug it nicely with the developer tools.

