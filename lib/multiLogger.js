const fs = require("fs")
const colors = require("colors");
module.exports = (basicOutput = "STDOUT",JSONOutput = "log.json", options = {
    colors: true,
    level: 0,
    defaultsender: "system"
}) => {
    if(options.colors === false) {
        colors.disable();
    } else {
        colors.enable();
    }
    if(Array.isArray(JSONOutput)) {
        JSONOutput.forEach((out) => {
            if(fs.lstatSync(out).size === 0) {
                const prestruct = '{"logs":[]}'
                fs.writeFileSync(out, prestruct, {encoding:"utf-8"})
            }
        })
    } else {
        if(fs.lstatSync(JSONOutput).size === 0) {
            const prestruct = '{"logs":[]}'
            fs.writeFileSync(JSONOutput, prestruct, {encoding:"utf-8"})
        }
    }
    function post(message = "", mtd, additionalData = {}, pure) {
        if(Array.isArray(basicOutput)) {
            basicOutput.forEach(out => {
                if(out === "STDOUT") {
                    switch (mtd) {
                        case 0:
                            console.log(message)
                            break;
                        case 1:
                            message = message.cyan
                            console.log(message)
                            break;
                        case 2:
                            message = message.yellow
                            console.warn(message)
                            break;
                        case 3:
                            message = message.red
                            console.error(message)
                            break;
                        case 4:
                            message = message.bgRed
                            console.error(message)
                            break;
                        default:
                            break;
                    }
                } else {
                    fs.writeFileSync(out, "\n" + message, {flag: "a", encoding: "utf-8"})
                }
            });
        } else if(basicOutput === "STDOUT") {
            switch (mtd) {
                case 0:
                    console.log(message)
                    break;
                case 1:
                    message = message.cyan
                    console.log(message)
                    break;
                case 2:
                    message = message.yellow
                    console.warn(message)
                    break;
                case 3:
                    message = message.red
                    console.error(message)
                    break;
                case 4:
                    message = message.bgRed
                    console.error(message)
                    break;
                default:
                    break;
            }
        } else {
            fs.writeFile(basicOutput, "\n" + message, {flag: "a", encoding: "utf-8"}, (err) => {
                if(err) console.log(err)
            })
        }
        if(Array.isArray(JSONOutput)) {
            JSONOutput.forEach((out) => {
                let log = JSON.parse(fs.readFileSync(out, {encoding: "utf-8"}))
                log.logs.push({timestamp: new Date()[Symbol.toPrimitive]("number"), message: pure, level: mtd, ...additionalData})
                fs.writeFileSync(out, JSON.stringify(log), {encoding:"utf-8"})
            })
        } else {
            let log = JSON.parse(fs.readFileSync(JSONOutput, {encoding: "utf-8"}))
            log.logs.push({timestamp: new Date()[Symbol.toPrimitive]("number"), message: pure, level: mtd, ...additionalData})
            fs.writeFileSync(JSONOutput, JSON.stringify(log), {encoding:"utf-8"})
        }
    }


    function send(message, level = 1, sender = options.defaultsender, additionalData = {}) {
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

    function trace(message, sender = options.defaultsender, additionalData = {}) {
        if(options.level < 1) {
            post(("[trace][" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 0, additionalData, message)
        }
    }

    function info(message, sender  = options.defaultsender, additionalData = {}) {
        if(options.level <= 1) {
            post(("[info] [" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 1, additionalData, message)
        }
    }

    function warn(message, sender  = options.defaultsender, additionalData = {}) {
        if(options.level <= 2) {
            post(("[warn] [" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 2, additionalData, message)
        }
    }

    function error(message, sender = options.defaultsender, additionalData = {}) {
        if(options.level <= 3) {
            post(("[error][" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 3, additionalData, message)
        }
    }

    function fatal(message, sender  = options.defaultsender, additionalData = {}) {
        if(options.level <= 4) {
            post(("[fatal][" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 4, additionalData, message)
        }
    }



    return {
        trace,
        info,
        warn,
        error,
        fatal,
        send
    }
}