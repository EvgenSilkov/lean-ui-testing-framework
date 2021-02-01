const SF = {}

SF.form = `[data-component="search/searchbox/searchbox-xp"]`
SF.searchBox = `${SF.form} [data-component="search/destination/input"]`
SF.getSerchBoxInput = ({ i = '', label = '' }) =>
  `${SF.searchBox} [data-list-item]${label && `[data-label^="${label}"]`}${i && `[data-i="${i}"]`}`
SF.dateErrors = `${SF.form} [data-component="search/dates/dates-errors"]`
SF.checkInDateField = `${SF.form} [data-component="search/dates/date-field-select"]`
SF.calendar = `${SF.form} [data-component="search/dates/single-calendar"]`
SF.getDate = ({ date = '' }) =>
  `${SF.calendar} [data-bui-ref="calendar-date"]${date && `[data-date="${date}"]`}`
SF.submitButton = `${SF.form} button[type="submit"][data-sb-id="main"]`

module.exports = SF
