const fs = require("fs")
const colors = require("colors");
module.exports = class multiLogger {
    basicOutput = "STDOUT"
    JSONOutput = "log.json"
    options = {
        colors: true,
        level: 0,
        defaultsender: "system"
    }
    constructor(basicOutput = "STDOUT", JSONOutput = "log.json", options = {
        colors: true,
        level: 0,
        defaultsender: "system"
    }) {
        this.basicOutput = basicOutput
        this.JSONOutput = JSONOutput
        this.options = options
        if(Array.isArray(this.JSONOutput)) {
            this.JSONOutput.forEach((out) => {
                if(fs.lstatSync(out).size === 0) {
                    const prestruct = '{"logs":[]}'
                    fs.writeFileSync(out, prestruct, {encoding:"utf-8"})
                }
            })
        } else {
            if(this.JSONOutput !== "" && this.JSONOutput !== null && this.JSONOutput !== undefined) {
                if(fs.lstatSync(this.JSONOutput).size === 0) {
                    const prestruct = '{"logs":[]}'
                    fs.writeFileSync(this.JSONOutput, prestruct, {encoding:"utf-8"})
                }
            }
        }
    }
    #post(message = "", mtd, additionalData = {}, pure) {
        
        if(Array.isArray(this.basicOutput)) {
            this.basicOutput.forEach(out => {
                if(out === "STDOUT") {
                    switch (mtd) {
                        case 0:
                            console.log(message)
                            break;
                        case 1:
                            if(this.options.colors) message = message.cyan;
                            console.log(message)
                            break;
                        case 2:
                            if(this.options.colors) message = message.yellow;
                            console.warn(message)
                            break;
                        case 3:
                            if(this.options.colors) message = message.red;
                            console.error(message)
                            break;
                        case 4:
                            if(this.options.colors) message = message.bgRed;
                            console.error(message)
                            break;
                        default:
                            break;
                    }
                } else {
                    fs.writeFileSync(out, "\n" + message, {flag: "a", encoding: "utf-8"})
                }
            });
        } else if(this.basicOutput === "STDOUT") {
            switch (mtd) {
                case 0:
                    console.log(message)
                    break;
                case 1:
                    if(this.options.colors) message = message.cyan;
                    console.log(message)
                    break;
                case 2:
                    if(this.options.colors) message = message.yellow;
                    console.warn(message)
                    break;
                case 3:
                    if(this.options.colors) message = message.red;
                    console.error(message)
                    break;
                case 4:
                    if(this.options.colors) message = message.bgRed;
                    console.error(message)
                    break;
                default:
                    break;
            }
        } else {
            if(this.basicOutput !== "" && this.basicOutput !== null && this.basicOutput !== undefined) {
                fs.writeFileSync(this.basicOutput, "\n" + message, {flag: "a", encoding: "utf-8"})
            };
        }
        if(Array.isArray(this.JSONOutput)) {
            this.JSONOutput.forEach((out) => {
                let log = JSON.parse(fs.readFileSync(out, {encoding: "utf-8"}))
                log.logs.push({timestamp: new Date()[Symbol.toPrimitive]("number"), message: pure, level: mtd, ...additionalData})
                fs.writeFileSync(out, JSON.stringify(log), {encoding:"utf-8"})
            })
        } else {
            if(this.JSONOutput !== "" && this.JSONOutput !== null && this.JSONOutput !== undefined) {
                let log = JSON.parse(fs.readFileSync(this.JSONOutput, {encoding: "utf-8"}))
                log.logs.push({timestamp: new Date()[Symbol.toPrimitive]("number"), message: pure, level: mtd, ...additionalData})
                fs.writeFileSync(this.JSONOutput, JSON.stringify(log), {encoding:"utf-8"})
            };
        }
    }


    send(message, level = 1, sender = this.options.defaultsender, additionalData = {}) {
        switch (level) {
            case 0:
                trace(message, sender)
                break;
            case 1:
                info(message, sender)
                break;
            case 2:
                warn(message, sender)
                break;
            case 3:
                error(message, sender)
                break;
            case 4:
                fatal(message, sender)
                break;
            default:
                info(message, sender)
                break;
        }
    }

    trace(message, sender = this.options.defaultsender, additionalData = {}) {
        if(this.options.level < 1) {
            this.#post(("[trace][" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 0, additionalData, message)
        }
    }

    info(message, sender  = this.options.defaultsender, additionalData = {}) {
        if(this.options.level <= 1) {
            this.#post(("[info] [" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 1, additionalData, message)
        }
    }

    warn(message, sender  = this.options.defaultsender, additionalData = {}) {
        if(this.options.level <= 2) {
            this.#post(("[warn] [" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 2, additionalData, message)
        }
    }

    error(message, sender = this.options.defaultsender, additionalData = {}) {
        if(this.options.level <= 3) {
            this.#post(("[error][" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 3, additionalData, message)
        }
    }

    fatal(message, sender  = this.options.defaultsender, additionalData = {}) {
        if(this.options.level <= 4) {
            this.#post(("[fatal][" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 4, additionalData, message)
        }
    }
}