const path = require('path')
const assert = require('assert').strict
const bucket = require('../test_utils/config_bucket.js')
const testName = path.basename(__filename)
const puppeteer = require('puppeteer')
const searchForm = require('../app/functional/mainSearchForm')
const propList = require('../app/functional/propertiesList')
const formatDate = require('../app/helpers/formatDate')

// global page, browser may be wanted but cases with 2 pages opened will be difficult
let page, browser

describe(`${testName} - ${bucket.CURRENT_VARIATION.name}`, function () {
  before(`launch browser`, async function () {
    browser = await puppeteer.launch({
      headless: false,
      dumpio: true,
      defaultViewport: null,
      args: [
        '--window-size=1920,1080',
        '--start-maximized',
        '--dissable-gpu',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--ignore-certificate-errors',
      ],
      timeout: 5000,
    })
    page = await browser.newPage()
  })
  step(`open url`, async function () {
    // if first step throws, second will be never executed
    // throw new Error('error')
    await page.goto('http://www.booking.com')
    await page.waitForSelector(searchForm.searchBox)
    await page.type(searchForm.searchBox, '\nLapland')

    await page.waitForSelector(searchForm.getSerchBoxInput({ label: 'Lapland' }), {
      visible: true,
      timeout: 3000,
    })

    await page.click(searchForm.getSerchBoxInput({ label: 'Lapland' }))

    const now = Date.now()
    
    // such pure fucntions should not be here be extracted to helpers
    // const getDate = date =>
    //   `${date.getFullYear()}-${`00${date.getMonth() + 1}`.slice(-2)}-${`00${date.getDate()}`.slice(-2)}`

    await page.waitForSelector(searchForm.getDate({ date: formatDate(now) }))
    await page.click(searchForm.getDate({ date: formatDate(now) }))
    await page.click(searchForm.getDate({ date: formatDate(now + 172800000) }))
  })

  step(`click submit`, async function () {
    await Promise.all([page.click(searchForm.submitButton), page.waitForNavigation()])
  })
  step(`assert page header`, async function () {
    // pure helpers like getText({ page, selector: propList.header }) should be extracted
    const text = await page.$eval(propList.header, el => el.innerText)

    // proper test shouldn't have translations inside it, this is an example
    assert.ok(
      /^Lapland: \d* properties found$/.test(text),
      `title of the properties list should be "Lapland \\d* properties found"
      actual title is ${text}`,
    )
  })
  after(`close browser`, async function () {
    await browser.close()
  })
})
