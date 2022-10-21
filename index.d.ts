export enum Log_level {trace, info, warn, error, fatal}
interface options {colors:boolean, level:number, defaultsender:string}

export class basicLogger {
    options:options
    output:(string | string[])
    constructor(output:(string | string[]), options:options)
    send(message:string, level:Log_level, sender:string):void;
    trace(message:string, sender:string):void
    info(message:string, sender:string):void
    warn(message:string, sender:string):void
    error(message:string, sender:string):void
    fatal(message:string, sender:string):void
}

export class multiLogger {
    options:options
    basicOutput:(string | string[])
    JSONOutput:(string | string[])
    constructor(basicOutput:(string | string[]), JSONOutput:(string | string[]), options:options)
    send(message:string, level:Log_level, sender:string, additionalData:object):void;
    trace(message:string, sender:string, additionalData:object):void
    info(message:string, sender:string, additionalData:object):void
    warn(message:string, sender:string, additionalData:object):void
    error(message:string, sender:string, additionalData:object):void
    fatal(message:string, sender:string, additionalData:object):void
}

export class JSONLogger {
    output:(string | string[])
    constructor(basicOutput:(string | string[]), JSONOutput:(string | string[]), options:options)
    send(data:object):void;
}

export const zeroLog = new multiLogger();