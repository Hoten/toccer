#! /usr/bin/env node

import fs from 'fs'
import expand from 'glob-expand'
import toccer from './'
import utils from './utils'
import path from 'path'

var args = utils.flatten(process.argv.slice(2).map(function (arg) {
  return expand(arg, '!node_modules/**/*.*')
}))

var defaultTocTemplatePath = path.join(__dirname, '..', 'toc.mustache')
var defaultTocTemplate = fs.readFileSync(defaultTocTemplatePath, 'utf8')

args.forEach(function (fileName) {
  var input = fs.readFileSync(fileName, 'utf8')
  var output = toccer(input, defaultTocTemplate)
  fs.writeFileSync(fileName, output)
})
