"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
var debug = require('debug')('logger-sdk');
const http = __importStar(require("./http"));
class LoggerSDK {
    constructor(options) {
        this.options = options;
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
        return (this.options && this.options.request && this.options.request.timeout) || 5;
    }
    get baseUri() {
        return (this.options && this.options.baseUri) || 'http://logger.byte.mn';
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
    log(name, message, attr) {
        return __awaiter(this, void 0, void 0, function* () {
            let header = { authorization: this.getToken() };
            let uri = `${this.baseUri}/api/log/${name}`;
            try {
                let rsu = yield http.post(uri, {
                    header, timeout: this.requestTimeout
                }, { message, attr });
                debug('log : logname=%s, message=%s, attr: %j', name, message, attr);
                return rsu;
            }
            catch (error) {
                debug('write error : logname=%s, message=%s, attr: %j, error: %o', name, message, attr, error);
                throw error;
            }
        });
    }
}
exports.LoggerSDK = LoggerSDK;
var l = new LoggerSDK({
    appid: 1,
    anchar: 'anchirname',
    owner: 'ownername',
    secretKey: '123456789'
});
l.log('testlog', 'message', {});
//# sourceMappingURL=index.js.map