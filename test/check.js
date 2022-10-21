const ml = require("..")
const log = new ml.basicLogger()

log.trace("system", "boo")
log.info("system", "boo")
log.warn("system", "boo")
log.options.colors = false;
log.error("system", "boo")
log.fatal("system", "boo")
