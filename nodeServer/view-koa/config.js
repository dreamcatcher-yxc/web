const defaultConfig = './config_default.js';
const overrideConfig = './config_override.js';
const testConfig = './config_test.js';
const NODE_ENV = ((str) => str === undefined ? 'default'.toLocaleString() : str.toLocaleString())(process.env.NODE_ENV);

const fs = require('fs');

var config = null;

if (NODE_ENV === 'test') {
    console.log(`Load ${testConfig}...`);
    config = require(testConfig);
} else {
    console.log(`Load ${defaultConfig}...`);
    config = require(defaultConfig);
    try {
        if (fs.statSync(overrideConfig).isFile()) {
            console.log(`Load ${overrideConfig}...`);
            config = Object.assign(config, require(overrideConfig));
        }
    } catch (err) {
        console.warn(`Cannot load ${overrideConfig}.`);
    }
}

module.exports = config;