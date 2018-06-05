# Logger SDK

## install
```
npm i --save https://github.com/Farcek/logger-sdk.git
```

## using

``` typescript
import {LoggerSDK} from 'logger-sdk'

// create instence
const log = new LoggerSDK({
    appid : 0,
    owner : 'print-service',
    anchar : 'client1',
    secretKey : 'xxxxxxxxxxxxx'
});


log.log('logname', 'message', {attr : 'any json object', any : { foo:1, bar : 'koo' } });

```

## config

``` typescript
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
```