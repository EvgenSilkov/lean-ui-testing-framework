# Lean ui testing framework

This project is a rough outline of a lean testing framework.
It yet finished, and author didn't thoroughly though about all ideas set in here.
The main value of this project is **explanations of design desicions**.
Look into \*.md files for that.

## Main design principles

1. Tests are grouped by functionality, they are not piled up.
2. Test.js file is the only place need to look into to understand what this test is about.
3. Test doesn't load unnecesary modules. Modules are slim, no God Classes.
4. Test can have chained steps in it. The first fail breaks the chain.
5. BeforeAll hooks are for framework setup only. The first test_step makes the application setup.
6. AfterAll hooks do not throw. Clean up on a failed test may crash, but without throwing.
7. Test has no application's configuration. Config_provider mimics/reuses config from acutal system.
8. Helpers functions for combining functionality may be possible, but they rely on config_provider.
9. No conditional steps in tests. Write two tests or add a helper to avoid the fork completely.
10. Funcitons call stack composed not out of anonymous functions.

## **1. Tests are grouped by functionality, they are not piled up.**

To manage suites we use `suites_config.json` file and existence of subfolders of `tests` directory is completelly ignored. Due to this we are free to move files in `tests` folder, group them in order to help with test_management integration (testRail).

## **2. Test.js file is the only neseccary place to read to understand what this test is about.**

No hidden checks or actions deep in the framework. *.js file is the paramount of necessary data. No underlying files hide essential actions.

## **3. Test doesn't load unnecesary modules. Modules are slim, no God Classes.**

PageObjectModel isn't used, as it may load unnecessary dependency. Why do Application would have single entry point, that imports all PageObjectWhatever, when my test only wants to check a small portion of one table

## **4. Test can have chained steps in it. The first fail breaks the chain.**



## **10. Funcitons call stack composed not out of anonymous functions.**
`app/helpers/count_rows.js`
provide funciton names like this
`javascript module.exports = async function countRows ({page}) {...} `
do not use anonymous function everywhere as call stack trace will be uninformative
`javascript module.exports = async ({page}) => {...} `
