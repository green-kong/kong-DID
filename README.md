# kong-DID

<a href="https://www.npmjs.com/package/kong-did">
  <img src="https://img.shields.io/npm/v/kong-did.svg" alt="Current Release" />
</a>

## 🚀 Getting Started

Run the following command:

```sh
npm install kong-did
```

## 🛠 Setting Config

#### Javascript

```js
// did.js

const { DID } = require('kong-did');

const config = {
  clientId: 'clientId' //API key
  redirectURI: 'redirectURI' // redirect URI that you wrote down when you apply application from DID site
};

const did = new DID(config);

module.exports = did;
```

#### Typescript

```ts
// did.ts

import { DID, IConfig } from 'kong-did';

const config: IConfig = {
  clientId: 'clientId' //API key
  redirectURI: 'redirectURI' // redirect URI that you wrote down when you apply application from DID site
};

const did = new DID(config);

export default did;
```

## 🫒 Using kong-DID

#### Get user information

```ts
// server.ts

const express = require('express');
const app = express();
const did = require('./did');

app.get('/did', (req, res) => {
  const authUrl = did.getAuthUrl();
  res.redirect(authUrl);
});

app.get('/did/redirect', async (req, res) => {
  const userInfo = await did.getUserInfo(req);
  console.log(userInfo);
  /* 
  userInfo example:
    {
      name: 'dev_kong',
      birth: '930126',
      gender: 'male',
      email: 'example@gmail.com',
      userCode: 'random5474768asdlkfjd65756765'
    }
  */
});

app.listen(3000);
```

#### Disconnect

```ts
const express = require('express');
const app = express();
const did = require('./did');

app.post('/disconnect', (req, res) => {
  const { userCode } = req.body;
  const result = did.disconnect(userCode); // return boolean
});

app.listen(3000);
```

That's it, have fun.
