const fs = require("fs")
const colors = require("colors");
module.exports = class basicLogger {
    output = "STDOUT"
    options = {
        colors: true,
        level: 0,
        defaultsender: "system"
    }
    constructor(output = "STDOUT", options = {
        colors: true,
        level: 0,
        defaultsender: "system"
    }) {
        this.output = output
        this.options = options
    }
    #post(data = "", mtd, color) {
        if(Array.isArray(this.output)) {
            this.output.forEach(out => {
                if(out === "STDOUT") {
                    switch (color) {
                        case 0:
            
                            break;
                        case 1:
                            data = data.cyan
                            break;
                        case 2:
                            data = data.yellow
                            break;
                        case 3:
                            data = data.red
                            break;
                        case 4:
                            data = data.bgRed
                            break;
                        default:
                            break;
                    }
                    switch (mtd) {
                        case 0:
                            console.log(data)
                            break;
                        case 1:
                            console.warn(data)
                            break;
                        case 2:
                            console.error(data)
                            break;
                        default:
                            console.log(data)
                            break;
                    }
                } else {
                    fs.writeFileSync(out, "\n" + data, {flag: "a", encoding: "utf-8"})
                }
            });
        } else if(this.output === "STDOUT") {
            switch (color) {
                case 0:
    
                    break;
                case 1:
                    data = data.cyan
                    break;
                case 2:
                    data = data.yellow
                    break;
                case 3:
                    data = data.red
                    break;
                case 4:
                    data = data.bgRed
                    break;
                default:
                    break;
            }
            switch (mtd) {
                case 0:
                    console.log(data)
                    break;
                case 1:
                    console.warn(data)
                    break;
                case 2:
                    console.error(data)
                    break;
                default:
                    console.log(data)
                    break;
            }
        } else {
            if(this.output !== "" && this.output !== null && this.output !== undefined) {
                fs.writeFileSync(this.output, "\n" + message, {flag: "a", encoding: "utf-8"})
            };
        }
    }


    send(message, level = 1, sender = this.options.defaultsender) {
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

    trace(message, sender = this.options.defaultsender) {
        if(this.options.level < 1) {
            this.#post(("[trace][" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 0, 0)
        }
    }

    info(message, sender  = this.options.defaultsender) {
        if(this.options.level <= 1) {
            this.#post(("[info] [" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 0, 1)
        }
    }

    warn(message, sender  = this.options.defaultsender) {
        if(this.options.level <= 2) {
            this.#post(("[warn] [" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 1, 2)
        }
    }

    error(message, sender  = this.options.defaultsender) {
        if(this.options.level <= 3) {
            this.#post(("[error][" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 2, 3)
        }
    }

    fatal(message, sender  = this.options.defaultsender) {
        if(this.options.level <= 4) {
            this.#post(("[fatal][" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 2, 4)
        }
    }

}
