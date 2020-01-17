#!/usr/bin/env node

const program = require('commander')
const lib = require('../lib/count')
const chalk = require('chalk');

program
  .version('0.0.1', '-v, --version')
  .usage('dir [exclude options]')
  .parse(process.argv)

function resolve(program) {
  const { args } = program
  const dir = args[0] || ''
  const excludeExt = args[1]
  console.log(
    chalk.cyan.bold('Scan files, please wait...')
  );
  
  lib.count(dir, count => {
    console.log(
      chalk.cyan.bold(`${chalk.green('Total lines of code: ->')} ${chalk.yellow.bold(count)} <-`)
    )
  }, excludeExt)
}

resolve(program)
