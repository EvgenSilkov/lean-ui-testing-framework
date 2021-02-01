const path = require('path')
const bucket = require(path.resolve('test_utils/config_bucket.js'))
const allConfigVariation = require(path.resolve('app/config_provider/country_config'))
bucket.CURRENT_VARIATION = allConfigVariation.mango
require(path.resolve('tests/t008_test_example.test.js'))
