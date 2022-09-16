import axios from 'axios';
import { Request } from 'express';

export interface IConfig {
  clientId: string;
  redirectURI: string;
}

interface IHeader {
  headers: { authorization: string };
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

export class DID {
  clientId: string;
  redirectURI: string;

  constructor(config: IConfig) {
    this.clientId = config.clientId;
    this.redirectURI = config.redirectURI;
  }

  getAuthUrl(): string {
    return `http://13.124.189.38:8000/authorizor/auth?clientID=${this.clientId}&redirectURI=${this.redirectURI}`;
  }

  async getUserInfo(req: Request): Promise<IUserData> {
    if (!req) {
      throw new Error('getUserInfo function requires "request" for parameter');
    }

    const code = DID.getCode(req);
    const token = await DID.getToken(code);

    if (!token) {
      throw new Error('unchecked Error: check request query');
    }

    const header = DID.getHeader(token);
    const userInfo = await DID.getUserInformation(header);

    if (!userInfo) {
      throw new Error('unChecked Error: check header');
    }

    return userInfo;
  }

  async disconnect(userCode: string): Promise<boolean> {
    if (!userCode) {
      throw new Error('userCode is undefined!');
    }

    const disconnectResult = await DID.disconnectFromApp(
      userCode,
      this.clientId
    );

    if (disconnectResult) {
      return true;
    } else {
      return false;
    }
  }

  async checkPoint(userCode: string): Promise<ICheckPoint | false> {
    try {
      const body = { userCode, clientId: this.clientId };
      const response = await axios.post(
        'http://13.124.189.38:4000/app/checkPoint',
        body
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async disconnectFromApp(userCode: string, clientId: string) {
    try {
      const body = { userCode, clientId };
      const response = await axios.post(
        'http://13.124.189.38:4000/user/disconnectFromApp',
        body
      );
      if (response.data) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static getCode(req: Request): string {
    const { code } = req.query;
    return code as string;
  }

  static async getToken(code: string): Promise<string | false> {
    try {
      const response = await axios.post(
        'http://13.124.189.38:8000/authorizor/token',
        {
          code,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static getHeader(token: string): IHeader {
    return { headers: { authorization: `Bearer ${token}` } };
  }

  static async getUserInformation(header: IHeader): Promise<IUserData | false> {
    try {
      const response = await axios.get(
        'http://13.124.189.38:8000/authorizor/user',
        header
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
