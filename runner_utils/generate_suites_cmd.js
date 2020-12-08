const allConfigVariation = require('../app/config_provider/countryConfig')
const path = require('path')
const suitesConfigPath = './suitesConfig.json'
const rreaddir = require('./rreaddir')
const exists = require('./exists')
const { writeFile, mkdir } = require('fs').promises

function getFileContent ({ variation, fileName }) {
  return `const path = require('path')
const bucket = require(path.resolve('test_utils/configBucket.js'))
const allConfigVariation = require(path.resolve('app/config_provider/countryConfig'))
bucket.CURRENT_VARIATION = allConfigVariation.${variation}
require(path.resolve('tests/${fileName}.test.js'))
`
}

async function generateSuites () {
  const suitesConfig = (await exists(suitesConfigPath))
    ? require(suitesConfigPath)
    : []

  const allFiles = await rreaddir(path.resolve(__dirname, '../tests'))
  const testFiles = allFiles.filter(filepath =>
    path.basename(filepath).includes('.test.js'),
  )
  const emptyRecords = suitesConfig.filter(
    test => !testFiles.some(filePath => filePath.includes(test.fileName)),
  )

  if (emptyRecords.length !== 0) {
    throw new Error(
      `there are records in SuitesConfig withouth files\n\n${emptyRecords
        .map(record => record.fileName)
        .join('\n')}\n\n`,
    )
  }

  const newFiles = []
  const mkdirPromises = []
  const writeFileData = []

  for (const testPath of testFiles) {
    const fileName = path.basename(testPath, '.test.js')

    let suiteRecord = suitesConfig.find(test => test.fileName === fileName)

    if (!suiteRecord) {
      suiteRecord = {
        fileName,
        isActive: true,
        suites: ['regression'],
        configVariations: [Object.keys(allConfigVariation)[0]],
      }
      newFiles.push(suiteRecord)
    }

    if (!suiteRecord.isActive) {
      continue
    }

    for (const suite of suiteRecord.suites) {
      for (const variation of suiteRecord.configVariations) {
        const suiteDirPath = path.resolve(`suites/${suite}/${variation}`)

        mkdirPromises.push(mkdir(suiteDirPath, { recursive: true }))

        writeFileData.push({
          filePath: path.resolve(`${suiteDirPath}/${fileName}.test.js`),
          data: getFileContent({ variation, fileName }),
        })
      }
    }
  }

  await Promise.all(mkdirPromises)

  await Promise.all([
    writeFile(
      suitesConfigPath,
      JSON.stringify([...suitesConfig, ...newFiles], null, 2),
      'utf8',
    ),
    ...writeFileData.map(({ filePath, data }) => {
      return writeFile(filePath, data, 'utf8')
    }),
  ])
}

generateSuites().catch(err => {
  console.error(err)
  // eslint-disable-next-line no-process-exit
  process.exit(1)
})
