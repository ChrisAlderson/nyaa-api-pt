# nyaa-api-pt

[![Build Status](https://travis-ci.org/ChrisAlderson/nyaa-api-pt.svg?branch=master)]()
[![Dependency Status](https://david-dm.org/ChrisAlderson/nyaa-api-pt.svg)](https://david-dm.org/ChrisAlderson/nyaa-api-pt)
[![devDependency Status](https://david-dm.org/ChrisAlderson/nyaa-api-pt/dev-status.svg)](https://david-dm.org/ChrisAlderson/nyaa-api-pt#info=devDependencies)

A [nyaa.se](https://www.nyaa.se/) API wrapper for NodeJS.

## Usage

#### Setup
```
npm install --save nyaa-api-pt
```

#### Initialize
```js
const NyaaAPI = require('nyaa-api-pt');

// Options are the request default options.
const nyaa = new NyaaAPI({[options, debug]});
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
  order: 'asc'
}).then(res => console.log(res))
  .catch(err => console.error(err));
```

## Output
```js
{
  total_pages: 1,
  results: [
    {
      title: '[HorribleSubs] Twin Angel BREAK - 06 [720p].mkv',
      link: 'https://nyaa.si/view/923089',
      torrent_link: 'https://nyaa.si/view/923089/torrent',
      magnet: 'magnet:?xt=urn:btih:RCIEYLUB5CNMY7EHB2T7E5KPMVG4YE54&dn=%5BHorribleSubs%5D+Twin+Angel+BREAK+-+06+%5B720p%5D.mkv&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Foscar.reyesleon.xyz%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.doko.moe%3A6969&tr=http%3A%2F%2Ftracker.baka-sub.cf%3A80%2Fannounce',
      size: '322.6 MiB',
      seeders: 47,
      leechers: 3,
      peers: 50,
      downloads: 703
    }
  ],
  ...
}
```

## Parameters

These are the parameters available to search on [nyaa.se](https://nyaa.se/):
```
- filter              # Trusted uploader filter
- category            # The category to filter
- sub_category        # The sub category to filter
- query               # A search term
- page                # The page to search on
- sort                # The property to sort on
- order               # Oder ascending or descending.
```

##### Categories & Sub-categories

These are the categories and sub-categories:

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
