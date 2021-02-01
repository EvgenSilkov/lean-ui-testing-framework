module.exports = {
  dataButton: (cellName) => { return`[data-test='cell-${cellName}']`},
  rowCSS: rowName => `[data-test='row-${rowName}']`,
  genericCellCSS: () => `[data-test^='cell-']`,
  genericRowCSS: () => `[data-test^='row-]`,
}
