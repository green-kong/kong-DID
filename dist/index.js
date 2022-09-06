"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DID = void 0;
const axios_1 = __importDefault(require("axios"));
class DID {
    constructor(config) {
        this.clientId = config.clientId;
        this.redirectURI = config.redirectURI;
    }
    getAuthUrl() {
        return `http://localhost:8000/authorizor/auth?clientID=${this.clientId}&redirectURI=${this.redirectURI}`;
    }
    getUserInfo(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req) {
                throw new Error('getUserInfo function requires "request" for parameter');
            }
            const code = DID.getCode(req);
            const token = yield DID.getToken(code);
            if (!token) {
                throw new Error('unchecked Error: check request query');
            }
            const header = DID.getHeader(token);
            const userInfo = yield DID.getUserInformation(header);
            if (!userInfo) {
                throw new Error('unChecked Error: check header');
            }
            return userInfo;
        });
    }
    static getCode(req) {
        const { code } = req.query;
        return code;
    }
    static getToken(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post('http://localhost:8000/authorizor/token', {
                    code,
                });
                return response.data;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static getHeader(token) {
        return { headers: { authorization: `Bearer ${token}` } };
    }
    static getUserInformation(header) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get('http://localhost:8000/authorizor/user', header);
                return response.data;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
}
exports.DID = DID;
