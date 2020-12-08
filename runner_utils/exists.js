'use strict'

const { access } = require('fs').promises

/**
 * @description check if a file is present
 * @param {String} path path to a file
 * @returns {Boolean}
 */
async function exists (path) {
  try {
    await access(path)
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false
    }

    throw err
  }

  return true
}

module.exports = exists
