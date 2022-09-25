const fs = require("fs")
let data = fs.readFileSync(process.argv[2], {encoding: "utf-8"})
let newfiledata = {logs: []}

for (let i = 0; i < data.split("\n").length; i++) {
    const log = data.split("\n")[i];
    if(log === "") continue;
    let piece = log.split("[");
    let level = piece[1].replace("] ", "").replace("]", "");
    console.log(level)
    switch (level) {
        case "trace":
            level = 0;
            break;
        case "info":
            level = 1;
            break;
        case "warn":
            level = 2;
            break;
        case "error":
            level = 3;
            break;
        case "fatal":
            level = 4;
            break;     
        default:
            break;
    }
    let timestamp = piece[2].split(" ")[0].replace("]", "");
    let author = piece[2].split(" ")[1].split("")
    author.pop()
    author = author.join("")
    msgchucks = piece.join("").split(": ")
    let message = ""
    for (let i = 1; i < msgchucks.length; i++) {
        const chunk = msgchucks[i];
        message += chunk
    }
    let newlog = {level: level, timestamp: timestamp, author: author, message: message}
    newfiledata.logs.push(newlog)
}

let filepath = process.argv[2].split(".")
filepath[filepath.length - 1] = "json"
filepath = filepath.join(".")
console.log(filepath)
fs.writeFileSync(process.argv[3] || filepath, JSON.stringify(newfiledata))