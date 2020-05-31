#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index';
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => (
    console.log(genDiff(filepath1, filepath2))))
  .parse(process.argv);
  