#!/usr/bin/env node

const program = require('commander')
const lib = require('../lib/count')

program
  .version('0.0.1', '-v, --version')
  .usage('dir [exclude options]')
  .parse(process.argv)

function resolve(program) {
  const { args } = program
  const dir = args[0] || ''
  const excludeExt = args[1]
  lib.count(dir, count => {
    console.log('Total lines of code:' + count)
  }, excludeExt)
}

resolve(program)
