#!/usr/bin/env node
import program from 'commander';
const f = (num) => num;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference')
  .parse(process.argv);
  console.log('hulo');