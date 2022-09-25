export enum Log_level {trace, info, warn, error, fatal}

export function basicLogger(output:string, {colors:boolean, level:number, defaultsender:string}):basicLogger
export function multiLogger(basicOutput:string, JSONOutput:string, {colors:boolean, level:number, defaultsender:string}):basicLogger

export interface basicLogger {
    send(message:string, level:Log_level, sender:string);
    trace(message:string, sender:string)
    info(message:string, sender:string)
    warn(message:string, sender:string)
    error(message:string, sender:string)
    fatal(message:string, sender:string)
}

export interface multiLogger {
    send(message:string, level:Log_level, sender:string, additionalData:object);
    trace(message:string, sender:string, additionalData:object)
    info(message:string, sender:string, additionalData:object)
    warn(message:string, sender:string, additionalData:object)
    error(message:string, sender:string, additionalData:object)
    fatal(message:string, sender:string, additionalData:object)
}

export function JSONLogger(output:string)

export interface JSONLogger {
    send(data:object)
}