#!/usr/bin/env node

const jre = require('node-jre');
const path = require('path');
const optimist = require('yargs')
    .version('1.0.0')
    .alias('i','input')
    .alias('o','output')
    .alias('t','type')
    .describe('i','Input URI (Path or URL')
    .describe('o', 'Output Path')
    .describe('t', 'The type of client to generate')
    .demandOption(['i','o','t']);

const argv = optimist.argv;

if (!argv._.length === 0) {
    optimist.showHelp();
    process.exit(argv.help ? 0 : 1);
}

var args = ['generate','-l',argv.t,'-i',argv.i,'-o',argv.o];

const cliPath = path.join(path.dirname(require.main.filename),'lib/swagger-codegen-cli.jar');

var output = jre.spawnSync(
    [cliPath],
    'io.swagger.codegen.SwaggerCodegen',
    args
);


var err = output.stderr.toString();
var out = output.stdout.toString();

console.log(out);
if (err.length > 0) {
    console.log(err);
    process.exit(1);
}
