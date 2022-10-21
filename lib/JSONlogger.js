const fs = require("fs")
const colors = require("colors");
module.exports = class JSONLogger {
    output = "log.json"
    constructor(output = "log.json") {
        this.output = output
        if(Array.isArray(this.output)) {
            this.output.forEach((out) => {
                if(fs.lstatSync(out).size === 0) {
                    const prestruct = '{"logs":[]}'
                    fs.writeFileSync(out, prestruct, {encoding:"utf-8"})
                }
            })
        } else {
            if(!(this.output === "" || this.output === null || this.output === undefined)) {
                if(fs.lstatSync(this.output).size === 0) {
                    const prestruct = '{"logs":[]}'
                    fs.writeFileSync(this.output, prestruct, {encoding:"utf-8"})
                }
            }
        }
    }

    send(data = {}) {
        if(this.output === "" || this.output === null || this.output === undefined) return;
        if(Array.isArray(this.output)) {
            this.output.forEach((out) => {
                let log = JSON.parse(fs.readFileSync(out, {encoding: "utf-8"}))
                log.logs.push({timestamp: new Date()[Symbol.toPrimitive]("number"), ...data})
                fs.writeFileSync(out, JSON.stringify(log), {encoding:"utf-8"})
            })
        } else {
            let log = JSON.parse(fs.readFileSync(this.output, {encoding: "utf-8"}))
            log.logs.push({timestamp: new Date()[Symbol.toPrimitive]("number"), ...data})
            fs.writeFileSync(this.output, JSON.stringify(log), {encoding:"utf-8"})
        }
    }
}