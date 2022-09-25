const fs = require("fs")
const colors = require("colors");
module.exports = (output = "log.json") => {
    if(Array.isArray(output)) {
        output.forEach((out) => {
            if(fs.lstatSync(out).size === 0) {
                const prestruct = '{"logs":[]}'
                fs.writeFileSync(out, prestruct, {encoding:"utf-8"})
            }
        })
    } else {
        if(fs.lstatSync(output).size === 0) {
            const prestruct = '{"logs":[]}'
            fs.writeFileSync(output, prestruct, {encoding:"utf-8"})
        }
    }

    function send(data = {}) {
        if(Array.isArray(output)) {
            output.forEach((out) => {
                let log = JSON.parse(fs.readFileSync(out, {encoding: "utf-8"}))
                log.logs.push({timestamp: new Date()[Symbol.toPrimitive]("number"), ...data})
                fs.writeFileSync(out, JSON.stringify(log), {encoding:"utf-8"})
            })
        } else {
            let log = JSON.parse(fs.readFileSync(output, {encoding: "utf-8"}))
            log.logs.push({timestamp: new Date()[Symbol.toPrimitive]("number"), ...data})
            fs.writeFileSync(output, JSON.stringify(log), {encoding:"utf-8"})
        }
    }

    return {
        send
    }
}