import { DID, IConfig } from '..';

const config: IConfig = { clientId: 'adf', redirectURI: 'adsf' };

let did: DID;
describe('DID test', () => {
  test('new DID test', () => {
    did = new DID(config);
    console.log(did);
  });

  test('getAuthUrl', () => {
    const authUrl = did.getAuthUrl();
    console.log(authUrl);
  });
});
