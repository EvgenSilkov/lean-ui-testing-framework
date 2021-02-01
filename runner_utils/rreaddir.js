'use strict'

const { join } = require('path')
const { readdir, stat } = require('fs').promises

/**
 * @description return all files in a directory inspected recursively
 * @param {String} dir path to directory to read recursively
 * @param {Array} allFiles fileList on recursive call
 * @returns {Array} filePathes to all found files in a directory
 */
async function rreaddir (dir, allFiles = []) {
  const files = (await readdir(dir)).map(f => join(dir, f))
  allFiles.push(...files)
  await Promise.all(files.map(async f => (await stat(f)).isDirectory() && rreaddir(f, allFiles)))
  return allFiles
}

module.exports = rreaddir
