# youtube-chapter-generator 
YouTube chapters generator will automatically generate chapters for you based on an object of set times.

```diff
- NOTE: THIS IS ONLY WORKING WITH ONE YOUTUBE VIDEO ON ONE PAGE, UPDATES ARE COMING
```

# Quick Start

## JavaScript

Begin by adding these tags to your document's `<head>`:

> Found in the app/assets folder.

```html
<link href="./path/to/youtube-chapters.min.css" rel="stylesheet">
<script src="./path/to/youtube-chapters.min.js"></script>
```

Next, just create a simple `<div>` element, but with an additional `id` or `class` attribute.
```html
<div id="player"></div>
```

To initialize the setup use the YTC function and pass in the element and options:
```js
var options = {
  youtubeId: 'ZyvwODEjmXw',
  fluid: true,
  width: '500px',
  height: '150px',
  playerVars: {
    iv_load_policy: 3,
    showinfo: 0,
    modestbranding: 1,
    wmode: 'transparent'
  },
  showTime: false,
  chapters: [
    {
      'time': '0m 0s',
      'title': '01 - Advent Rising - Muse',
      'id': 'id1'
    },
    {
      'time': '03:43',
      'title': '02 - Legend of Zelda - Suite',
      'id': 'id2'
    }
  ]
};

YTC('#player', options);
```

## Options

Note: All options have a set default.

### Standard `YTC` Options

### `youtubeId`

> Type: `string`

Sets the YouTube video based on the ID.

### `fluid`

> Type: `boolean` Default: `false`

Sets if the YouTube video should be fluid/responseive.

### `width`

> Type: `string` Default: `100%`

Sets the video and wrapper width.

### `height`

> Type: `string` Default `100%`

Sets the video height.

### `playerVars`

> Type: `object` Default `{}`

Sets the YouTube playerVars, refer to the [YouTube API refrence](https://developers.google.com/youtube/iframe_api_reference)

### `showTime`

> Type: `boolean` Default `false`

Sets if the times should appear in the chapater elements

### `chapters`

> Type: `array/object` Default `[{}]`

Sets the chapters of the YouTube video.

#### `chapters` Options

#### `time`

> Type: `string`

Sets the time of the current chapter. You may use two format for this, hms and hh:mm:ss. If you set `showTime` to true, then the time will appear as is. So if you use hms ensure you add a space between each time.

```js
'time': '0m 0s' //better to use 1h 0m 0s rather than 1h0m0s

'time': '03:43'
```

#### `title`

> Type: `string`  

Sets the title of the current chapter.

#### `id`

> Type: `string` 

Sets the id of the current chapter.

```diff
- New features are coming soon.
```