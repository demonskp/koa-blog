const baseConfig:Config = require('./baseConfig.json');
const devConfig:Dboption = require('./devConfig.json');

declare interface Dboption {
    HOST:string;
    USERNAME:string;
    PASSWORD:string;
    DBNAME:string;
}

declare interface Config {
    MarkDownPath:string;
    PublicPath:string;
    mysql:Dboption;
}
var config:Config = baseConfig;
var args = process.argv[2];
if(args === "development"){
    config = Object.assign(baseConfig,devConfig);
} 


export {config};

