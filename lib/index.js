var basicLogger = require("./basicLogger")
var JSONLogger = require("./JSONLogger")
var multiLogger = require("./multiLogger")

const Log_level = {
    trace: 0,
    info: 1,
    warn: 2,
    error: 3,
    fatal: 4
}

const zeroLog = new multiLogger("STDOUT", "")

module.exports = {
    basicLogger,
    JSONLogger,
    multiLogger,
    zeroLog,
    Log_level
}