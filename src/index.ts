const jwt = require('jsonwebtoken');
var debug = require('debug')('logger-sdk');

import * as http from './http';
export interface ILoggerSDK {
    appid: number

    /**
     * Эзэмшигч
     * Хэрэглэч байгаа програм. 
     */
    owner: string

    /**
     * Ашиглагч
     * Ажиллаж байгаа салбар нэгж
     */
    anchar: string


    secretKey: string

    /**
     * default : 1m
     */
    expiresIn?: number | string

    /**
     * Logger service base url
     * default : `http://logger.byte.mn`
     */
    baseUri?: string
    request?: {
        /**
         * request timeout 
         * default : 5 sec
         */
        timeout?: number
    }
}

export interface ILog {
    name: string
    message: string

    attr?: any
}
export class LoggerSDK {
    constructor(private options: ILoggerSDK) {
        debug('create instence : %j', this.options);
    }

    getToken() {
        let payload = { ap: this.options.appid, ow: this.options.owner, an: this.options.anchar };
        let key = this.options.secretKey;

        let expiresIn = this.options.expiresIn || '1m';
        let token = jwt.sign(payload, key, {
            jwtid: 'logger-client',
            // algorithm: 'RS256',
            expiresIn
        });

        debug('create token : %s', token);

        return token;
    }

    get requestTimeout() {
        return (this.options && this.options.request && this.options.request.timeout) || 5
    }

    get baseUri() {
        return (this.options && this.options.baseUri) || 'http://logger.byte.mn'
    }


    /**
     * write log message & data
     * 
     * @param name Log name
     * @param message Log message
     * @param attr log custom message
     * 
     * @returns { id : string} log id
     */
    async log(name: string, message: string, attr?: any): Promise<{ id: string }> {
        let header = { authorization: this.getToken() };

        let uri = `${this.baseUri}/api/log/${name}`;
        

        try {
            let rsu = await http.post<{ id: string }>(uri, {
                    header, timeout: this.requestTimeout
                }, { message, attr });

                debug('log : logname=%s, message=%s, attr: %j', name, message, attr);
                return rsu;
        } catch (error) {
            debug('write error : logname=%s, message=%s, attr: %j, error: %o', name, message, attr, error);
            throw error;
        }
    }
}

var l = new LoggerSDK({
    appid : 1,
    anchar : 'anchirname',
    owner : 'ownername',
    secretKey : '123456789'
});

l.log('testlog','message',{})