import * as Log4js from 'koa-log4';
import * as path from 'path';

Log4js.configure({
    appenders: {
        access: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log', //生成文件的规则
            filename: path.join(__dirname, '../../log/access.log') //生成文件名
        },
        application: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log',
            filename: path.join(__dirname, '../../log/application.log')
        },
        out: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'info'
        },
        access: {
            appenders: ['access'],
            level: 'info'
        },
        application: {
            appenders: ['application'],
            level: 'warn'
        }
    }
})


const accessLogger = () => Log4js.koaLogger(Log4js.getLogger('access')); //记录所有访问级别的日志
const logger = Log4js.getLogger('application'); //记录所有应用级别的日志

export {
    accessLogger,
    logger
} 