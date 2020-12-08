const path = require('path')
const bucket = require('../test_utils/configBucket.js')
const testName = path.basename(__filename)

describe(`${testName} - ${bucket.CURRENT_VARIATION.name}`, function () {
  step(`application setup`, async function () {})
  step(`do some crazy test`, async function () {})
  step(`do more crazy tests`, async function () {})
})
