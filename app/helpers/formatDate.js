/**
 * returns date in format for calendar
 * @param {int} now millisecnds from 1 of jan 1970
 */
module.exports = function formatDate(now) {
  const isoDate = new Date(now)

  function twoChar(value) {
    return `00${value}`.slice(-2)
  }

  return `${isoDate.getFullYear()}-${twoChar(isoDate.getMonth() + 1)}-${twoChar(isoDate.getDate())}`
}
