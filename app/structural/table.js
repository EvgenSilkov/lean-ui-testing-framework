module.exports = {
  cellCSS: cellName => `[data-test='cell-${cellName}']`,
  rowCSS: rowName => `[data-test='row-${rowName}']`,
  genericCellCSS: () => `[data-test^='cell-']`,
  genericRowCSS: () => `[data-test^='row-]`,
}
