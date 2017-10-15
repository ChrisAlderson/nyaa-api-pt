# nyaa-api-pt

[![Build Status](https://travis-ci.org/ChrisAlderson/nyaa-api-pt.svg?branch=master)](https://travis-ci.org/ChrisAlderson/nyaa-api-pt)
[![Coverage Status](https://coveralls.io/repos/github/ChrisAlderson/nyaa-api-pt/badge.svg?branch=master)](https://coveralls.io/github/ChrisAlderson/nyaa-api-pt?branch=master)
[![Dependency Status](https://david-dm.org/ChrisAlderson/nyaa-api-pt.svg)](https://david-dm.org/ChrisAlderson/nyaa-api-pt)
[![devDependency Status](https://david-dm.org/ChrisAlderson/nyaa-api-pt/dev-status.svg)](https://david-dm.org/ChrisAlderson/nyaa-api-pt#info=devDependencies)

A [nyaa.pantsu.cat](https://nyaa.pantsu.cat/) API wrapper for NodeJS. For more
documentation you can checkout the official documentation of the API
[here](https://nyaa.pantsu.cat/apidoc/).

## Usage

#### Setup
```
npm install --save nyaa-api-pt
```

#### Initialize
```js
const NyaaAPI = require('nyaa-api-pt')

const nyaa = new NyaaAPI({
  baseUrl // The base url of nyaa. Default to 'https://nyaa.pantsu.cat/'.
  apiToken // Your API token from nyaa.
})
```

#### Methods

 - search
 - getTorrent
 - getTorrentHead
 - uploadTorrent
 - updateTorrent
 - login
 - getProfile

# License

MIT License

Copyright (c) 2017 - nyaa-api-pt - Released under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
