# nyaa-api-pt

[![Build Status](https://travis-ci.org/ChrisAlderson/nyaa-api-pt.svg?branch=master)](https://travis-ci.org/ChrisAlderson/nyaa-api-pt)
[![Coverage Status](https://coveralls.io/repos/github/ChrisAlderson/nyaa-api-pt/badge.svg?branch=2.0.0-alpha.0)](https://coveralls.io/github/ChrisAlderson/nyaa-api-pt?branch=2.0.0-alpha.0)
[![Dependency Status](https://david-dm.org/ChrisAlderson/nyaa-api-pt.svg)](https://david-dm.org/ChrisAlderson/nyaa-api-pt)
[![devDependency Status](https://david-dm.org/ChrisAlderson/nyaa-api-pt/dev-status.svg)](https://david-dm.org/ChrisAlderson/nyaa-api-pt#info=devDependencies)

A [nyaa.pantsu.cat](https://nyaa.pantsu.cat/) API wrapper for NodeJS.

## Usage

#### Setup
```
npm install --save nyaa-api-pt
```

#### Initialize
```js
const NyaaAPI = require('nyaa-api-pt')

// baseUrl and debug are optional.
const nyaa = new NyaaAPI({[baseUrl, debug]})
```

#### Example usage

```js
nyaa.search({
  query: 'horriblesubs',
  filter: 'trusted_only',
  category: 'anime',
  sub_category: 'english_translated',
  page: 2,
  sort: 'date',
  order: false,
  max: 300,
  userID: 14
}).then(res => console.log(res))
  .catch(err => console.error(err))
```

Or

```js
nyaa.get({
  max: 50,
  page: 1
}).then(res => console.log(res))
  .catch(err => console.error(err))
```

##### Parameters

These are the parameters available to search on
[nyaa.pantsu.cat](https://nyaa.pantsu.cat/):
```
 - query              # A search term
 - filter             # Trusted uploader filter
 - category           # The category to filter
 - sub_category       # The sub category to filter
 - page               # The page to search on
 - sort               # The property to sort on
 - order              # Oder ascending or descending
 - max                #
 - userID             #
```

##### Categories & Sub-categories

These are the categories and sub-categories:
```
 - all_categories
 - anime
   - english_translated
   - raw
   - non_english_translated
   - anime_music_video
 - literature
   - english_translated
   - raw
   - non_english_translated
 - audio
   - lossless
   - lossy
 - pictures
   - photos
   - graphics
 - live_action
   - english_translated
   - raw
   - mon_english_translated
   - idol_promotional_video
 - software
   - applications
   - games
```

##### Filters

The available filter options:
```
 - show_all
 - filter_remakes
 - trusted_only
 - a_only
```

##### Sorting

The available sorting options:
```
 - name
 - seeders
 - downloads
 - leechers
 - date
 - size
```

## Output

```js
TODO: add example output.
```

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
