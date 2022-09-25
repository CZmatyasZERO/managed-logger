const fs = require("fs")
const colors = require("colors");
module.exports = (output = "STDOUT", options = {
    colors: true,
    level: 0,
    defaultsender: "system"
}) => {
    function post(data = "", mtd, color) {
        if(options.colors === false) {
            colors.disable();
        } else {
            colors.enable();
        }
        if(Array.isArray(output)) {
            output.forEach(out => {
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
        } else if(output === "STDOUT") {
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
            fs.writeFile(output, "\n" + data, {flag: "a", encoding: "utf-8"}, (err) => {
                if(err) console.log(err)
            })
        }
    }


    function send(message, level = 1, sender = options.defaultsender) {
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

    function trace(message, sender = options.defaultsender) {
        if(options.level < 1) {
            post(("[trace][" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 0, 0)
        }
    }

    function info(message, sender  = options.defaultsender) {
        if(options.level <= 1) {
            post(("[info] [" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 0, 1)
        }
    }

    function warn(message, sender  = options.defaultsender) {
        if(options.level <= 2) {
            post(("[warn] [" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 1, 2)
        }
    }

    function error(message, sender  = options.defaultsender) {
        if(options.level <= 3) {
            post(("[error][" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 2, 3)
        }
    }

    function fatal(message, sender  = options.defaultsender) {
        if(options.level <= 4) {
            post(("[fatal][" + new Date().toLocaleTimeString() + "] " + sender + ": " + message), 2, 4)
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