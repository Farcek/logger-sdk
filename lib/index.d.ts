export interface ILoggerSDK {
    appid: number;
    /**
     * Эзэмшигч
     * Хэрэглэч байгаа програм.
     */
    owner: string;
    /**
     * Ашиглагч
     * Ажиллаж байгаа салбар нэгж
     */
    anchar: string;
    secretKey: string;
    /**
     * default : 1m
     */
    expiresIn?: number | string;
    /**
     * Logger service base url
     * default : `http://logger.byte.mn`
     */
    baseUri?: string;
    request?: {
        /**
         * request timeout
         * default : 5 sec
         */
        timeout?: number;
    };
}
export interface ILog {
    name: string;
    message: string;
    attr?: any;
}
export declare class LoggerSDK {
    private options;
    constructor(options: ILoggerSDK);
    getToken(): any;
    readonly requestTimeout: number;
    readonly baseUri: string;
    /**
     * write log message & data
     *
     * @param name Log name
     * @param message Log message
     * @param attr log custom message
     *
     * @returns { id : string} log id
     */
    log(name: string, message: string, attr?: any): Promise<{
        id: string;
    }>;
}
