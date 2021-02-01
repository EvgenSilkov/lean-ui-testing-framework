module.exports = async function filForm (page) {
  await Promise.all([
    page.type('someCss'),
    page.type('someCss'),
    page.type('someCss'),
    page.type('someCss'),
    page.type('someCss'),
    page.type('someCss'),
    page.type('someCss')
  ])
}
