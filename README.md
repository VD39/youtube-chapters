# youtube-chapter-generator
YouTube chapters generator will automatically generate chapters for you based on an object of set times.

## [View a working example](https://run.plnkr.co/DtBNWzAIAlFH775w/)

```diff
New Features:
+ NPM install
+ Chaining methods
+ New ready method
```

# Quick Start

## Install

```sh
npm i youtube-chapters --save
```

## JavaScript

### ES6

```js
import '../node_modules/youtube-chapters/dist/css/youtube-chapters.css';
import YTC from '../node_modules/youtube-chapters/dist/js/youtube-chapters';
```

### ES5

Begin by adding these tags to your document's `<head>`:

> Found in the app/assets folder.

```html
<link href="./path/to/youtube-chapters.min.css" rel="stylesheet">
<script src="./path/to/youtube-chapters.min.js"></script>
```

### HTML

Next, just create a simple `<div>` element, but with an additional `id` or `class` attribute.

```diff
- NOTE: Using a class will only render this for one element, I recommend you use `id` every time.
```

```html
<div id="player"></div>
```

### Initialise

To initialise the setup use the YTC function and pass in the element and options:

```js
var options = {
  youtubeId: 'ZyvwODEjmXw',
  id: 'soundtrack',
  loadingText: '<p>Loading text</p>',
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
      'id': 'id1',
      'text': '01 - Advent Rising - Muse'
    },
    {
      'time': '03:43',
      'title': '02 - Legend of Zelda - Suite',
      'id': 'id2',
      'text': ''
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

### `id`

> Type: `string` Default: `random number`

Sets the ID to be used, set this if you want to manipulate the DOM as a random number will be set every time.

### `loadingText`

> Type: `string`

Sets loading HTML/string text, visible while the video is loading.

### `fluid`

> Type: `boolean` Default: `false`

Sets if the YouTube video should be fluid/responsive.

### `width`

> Type: `string` Default: `100%`

Sets the video and wrapper width.

### `height`

> Type: `string` Default `100%`

Sets the video height.

### `playerVars`

> Type: `object` Default `{}`

Sets the YouTube playerVars, refer to the [YouTube API refrence](https://developers.google.com/youtube/iframe_api_reference).

### `showTime`

> Type: `boolean` Default `false`

Sets if the times should appear in the chapter elements.

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

#### `text`

> Type: `string`

Sets the optional supporting text for the current chapter.

## Methods

### `ready(callback)`

Ready function to call once the video has loaded.

Here you can manipulate the DOM and get access to the YouTube player.

```js
YTC(element, options)
  .ready(function (player) {
    ....
  });

or

let player = new YTC();
player.ready(function (player) {
  ....
});
```

### `goToChatperId(id)`

Goes to the video position of the chapter ID.

```js
YTC(element, options)
  .goToChatperId('id1');

or

let player = new YTC();
player.goToChatperId('id1');
```

### `seekTo(seekToTime)`

Goes to the position of the YouTube video.

```js
YTC(element, options)
  .seekTo('03:43'); or
  .seekTo('2m 0s'); or
  .seekTo(67);

or

let player = new YTC(element, options);
player.seekTo('03:43'); or
player.seekTo('2m 0s'); or
player.seekTo(67);
```

### `play()`

Plays the YouTube video.

```js
YTC(element, options)
  .play();

or

let player = YTC(element, options);
player.play();
```

### `pause()`

Pauses the YouTube video.

```js
YTC(element, options)
  .pause();

or

let player = YTC(element, options);
pause.play();
```

```diff
New features to come:
- New theme
- Responsive layout
```
