const jwt = require('jsonwebtoken');

import * as http from './http';
export interface ILoggerSDK {
    appid: number
    owner: string
    anchar: string


    secretKey: string
    expiresIn?: number | string

    /**
     * Logger service base url
     * default : `http://logger.byte.mn`
     */
    baseUri?: string
    request?: {
        /**
         * request timeout 
         * default : 2 sec
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

    }

    getToken() {
        let payload = { ap: this.options.appid, ow: this.options.owner, an: this.options.anchar };
        let key = this.options.secretKey;

        let expiresIn = this.options.expiresIn || '1m';
        return jwt.sign(payload, key, {
            jwtid: 'logger-client',
            // algorithm: 'RS256',
            expiresIn
        });
    }

    get requestTimeout() {
        return (this.options && this.options.request && this.options.request.timeout) || 2
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

        console.log('uri', uri)
        let rsu = await http.post<{ id: string }>(uri, {
            header, timeout: this.requestTimeout
        }, { message, attr });

        console.log('rsu', rsu)

        return rsu;
    }
}