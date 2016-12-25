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
  term: 'bakemonogatari',
  filter: 'trusted_only',
  category: 'anime',
  sub_category: 'english_translated'
}).then(res => console.log(res))
  .catch(err => console.error(err));
```

## Output
```js
[
  {
    category: 'Anime',
    sub_category: 'English-translated',
    torrent_name: '[Coalgirls]_Bakemonogatari_v3.1_(1920x1080_Blu-ray_FLAC)',
    torrent_link: 'https://www.nyaa.se/?page=view&tid=759691',
    download_link: 'https://www.nyaa.se/?page=download&tid=759691',
    size: '17.82 GiB',
    seeders: '30',
    leechers: '11',
    peers: '3011',
    downloads: '11057',
    messages: '0'
  },
  ...
]
```

## Parameters

These are the parameters available to search on [nyaa.se](https://nyaa.se/):
```
- filter              # Trusted uploader filter
- category            # The category to filter
- sub_category        # The sub category to filter
- term                # A search term
- user                # The id of the uploader
- offset              # The page to search on
```

##### Categories & Sub-categories

These are the categories and sub-categories:

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
 - live_ation
   - english_translated
   - raw
   - mon_english_translated
   - idol_promotional_video
 - software
   - applications
   - games

# License

MIT License

Copyright (c) 2016 - nyaa-api-pt - Released under the MIT license.

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
