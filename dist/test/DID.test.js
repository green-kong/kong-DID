"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const config = { clientId: 'adf', redirectURI: 'adsf' };
let did;
describe('DID test', () => {
    test('new DID test', () => {
        did = new __1.DID(config);
        console.log(did);
    });
    test('getAuthUrl', () => {
        const authUrl = did.getAuthUrl();
        console.log(authUrl);
    });
});
