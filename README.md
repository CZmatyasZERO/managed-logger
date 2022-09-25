<img align="center" width="100px" height="100px" src="https://raw.githubusercontent.com/CZmatyasZERO/managed-logger/master/logo.svg" alt="logo">
<h1>managed-logger</h1>
<span>
    <img src="https://shields.io/npm/v/managed-logger" alt="version"><img src="https://img.shields.io/bundlephobia/min/managed-logger" alt="version">
</span>
<p>You can now log data in many variations.</p>
<h2>Install</h2>
<p>NPM:</p>

```bash
$ npm install managed-logger
```

<h2>Loggers</h2>

|Function|Description|
|--------|-----------|
|basicLogger()|Can print to console or .log file. Classic style of log message. Level, time, author, message|
|JSONLogger()|Prints into .json file. Adding objects to an array. Custom query + added timestamp.|
|multiLogger()|Have two outputs. To JSON output added level, author and message information|

More details is described in typescript declarations.
