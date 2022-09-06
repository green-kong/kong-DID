import { Request } from 'express';
export interface IConfig {
    clientId: string;
    redirectURI: string;
}
interface IHeader {
    headers: {
        authorization: string;
    };
}
interface IUserData {
    name: string;
    birth: string;
    gender: string;
    email: string;
    userCode: string;
}
export declare class DID {
    clientId: string;
    redirectURI: string;
    constructor(config: IConfig);
    getAuthUrl(): string;
    getUserInfo(req: Request): Promise<IUserData>;
    static getCode(req: Request): string;
    static getToken(code: string): Promise<string | false>;
    static getHeader(token: string): IHeader;
    static getUserInformation(header: IHeader): Promise<IUserData | false>;
}
export {};
