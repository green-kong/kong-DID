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
interface ICheckPoint {
    a_idx: string;
    name: string;
    pt: string;
}
export declare class DID {
    clientId: string;
    redirectURI: string;
    constructor(config: IConfig);
    getAuthUrl(): string;
    getUserInfo(req: Request): Promise<IUserData>;
    disconnect(userCode: string): Promise<boolean>;
    checkPoint(userCode: string): Promise<ICheckPoint | false>;
    static disconnectFromApp(userCode: string, clientId: string): Promise<boolean | undefined>;
    static getCode(req: Request): string;
    static getToken(code: string): Promise<string | false>;
    static getHeader(token: string): IHeader;
    static getUserInformation(header: IHeader): Promise<IUserData | false>;
}
export {};
