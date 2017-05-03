/*!
 * youtube-chapters
 * A YouTube chapter generator
 * https://github.com/VD39/youtube-chapters
 * @author Vijay Dubb
 * @version 3.1.0
 * Copyright 2013. MIT licensed.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("YTC", [], factory);
	else if(typeof exports === 'object')
		exports["YTC"] = factory();
	else
		root["YTC"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YouTubeChapters = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helperFunctions = __webpack_require__(2);

var _query = __webpack_require__(4);

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _elements = []; // Elements array to store the elements
var _players = []; // Players array to store the current players

/**
 * Main YouTubeChapters class
 *
 * @class YouTubeChapters
 * @example
 * YouTubeChapters('elementID', options);
 *
 * or
 *
 * let player = new YouTubeChapters('elementID', options);
 */

var YouTubeChapters = exports.YouTubeChapters = function () {

  /**
   * Main constructor for YouTubeChapters class
   * @constructor
   * @param {string} element - A DOM element to wrap in a YouTubeChapters object.
   * @param {object} options - The options for the YouTube video
   * @param {string} options.youtubeId - Sets the YouTube video based on the ID.
   * @param {string} [options.id=A random number] - The random ID of the element.
   * @param {string} [options.loader=Default loader] - Loader for the YouTube chapter frame.
   * @param {bool} [options.fluid=false] - Sets if the YouTube video should be fluid/responsive.
   * @param {array} [options.width=500px] - Sets the video and wrapper width.
   * @param {array} [options.height=350px] - Sets the video height.
   * @param {object} [options.playerVars=[]] - Sets the YouTube playerVars.
   * @param {bool} [options.showTime=false] - Sets if the times should appear in the chapter frame.
   * @param {array} options.chapters -Sets the chapters of the YouTube video.
   */
  function YouTubeChapters(element, options) {
    _classCallCheck(this, YouTubeChapters);

    this.options = (0, _helperFunctions.defaultOption)(options, {});

    for (var i = 0; i < _elements.length; i += 1) {
      if (_elements[i] === element) {
        throw new Error('An instance of YouTubeChapters with element ' + element + ' already exists.');
      }
    }

    if (!element || typeof element !== 'string') {
      throw new Error('Element has not been set, please set an element.');
    }

    if ((0, _query2.default)(element).length < 1) {
      throw new Error('Element ' + this.element + ' does not exsit.');
    }

    this._interval = null;
    this._playerReadyFunction = [];
    this._readyFunction = [];
    this.element = element;
    this.ytc = {};
    this.ytc.id = (0, _helperFunctions.defaultOption)(this.options.id, Math.floor(Math.random() * 99999));
    this.ytc.element = 'youtube-iframe-' + this.ytc.id;
    this.ytc.player = null;
    this.ytc.options = {
      youtubeId: (0, _helperFunctions.defaultOption)(this.options.youtubeId, 'bHQqvYy5KYo'),
      loader: (0, _helperFunctions.defaultOption)(this.options.loader, (0, _helperFunctions.loader)()),
      fluid: (0, _helperFunctions.defaultOption)(this.options.fluid, false),
      playerVars: (0, _helperFunctions.defaultOption)(this.options.playerVars, {}),
      width: (0, _helperFunctions.defaultOption)(this.options.width, '500px'),
      height: (0, _helperFunctions.defaultOption)(this.options.height, '350px'),
      showTime: (0, _helperFunctions.defaultOption)(this.options.showTime, false),
      chapters: (0, _helperFunctions.sort)((0, _helperFunctions.defaultOption)(this.options.chapters, []))
    };

    if ((0, _helperFunctions.checkIds)(this.options.chapters)) {
      throw new Error('All ID\'s must be unqiue');
    }

    this._init();
  }

  /**
   * Begin the initialisation of the library.
   * @private
   * @returns {YouTubeChapters} YouTubeChapters
   */


  _createClass(YouTubeChapters, [{
    key: '_init',
    value: function _init() {
      _elements.push(this.element);
      this._buildStruture()._addChapterPoints()._addTextPoints()._addYouTubeVideo();
    }

    /**
     * Builds the main structure of YouTube frame.
     * @private
     * @returns {YouTubeChapters} YouTubeChapters
     */

  }, {
    key: '_buildStruture',
    value: function _buildStruture() {
      var mainElement = (0, _query2.default)(this.element);

      mainElement.addElement('div', {
        class: 'loading'
      }, this.ytc.options.loader).addElement('div', {
        class: 'youtube-chapter-wrapper'
      });

      mainElement.find('.loading').width(mainElement.parent().width());

      mainElement.find('.youtube-chapter-wrapper').addElement('div', {
        class: 'youtube-wrapper',
        style: 'max-width: ' + this.ytc.options.width
      }).addElement('div', {
        class: 'chapters-wrapper'
      }).addElement('div', {
        class: 'text-wrapper'
      }).find('.youtube-wrapper').addElement('div', {
        class: 'youtube-video ' + (this.ytc.options.fluid ? 'fluid-wrapper' : ''),
        id: 'youtube-video-' + this.ytc.id
      }).find('.youtube-video').addElement('div', {
        class: 'youtube-iframe',
        id: this.ytc.element
      });

      mainElement.find('.chapters-wrapper').addElement('ul', {
        id: 'chapters-wrapper-' + this.ytc.id
      });

      mainElement.find('.text-wrapper').addElement('ul', {
        id: 'text-wrapper-' + this.ytc.id
      });

      return this;
    }

    /**
     * Add the chapter points to the YouTube player frame.
     * @private
     * @returns {YouTubeChapters} YouTubeChapters
     */

  }, {
    key: '_addChapterPoints',
    value: function _addChapterPoints() {
      var _this = this;

      /**
       * Sets the click event to each chapter point.
       * @private
       * @param {event} event
       */
      var goToChatper = function goToChatper(event) {
        event.preventDefault();
        _this.seekTo(event.currentTarget.getAttribute('data-time'));
      };

      var chaptersWrapper = (0, _query2.default)('#chapters-wrapper-' + this.ytc.id);

      (0, _query2.default)(this.ytc.options.chapters).each(function (index, current) {
        chaptersWrapper.addElement('li', {
          class: 'chapter-point-wrapper',
          id: 'chapter-' + current.id + '-' + _this.ytc.id,
          dataTime: (0, _helperFunctions.convertTime)(current.time)
        }).find('li.chapter-point-wrapper').addElement('div', {
          class: 'chapter-point',
          id: 'chapter-point-' + current.id + '-' + _this.ytc.id
        }, current.title).find('.chapter-point').addElement('span', {
          class: 'time'
        }, _this.ytc.options.showTime ? current.time : '');
      });

      chaptersWrapper.find('li.chapter-point-wrapper').addEvent('click', goToChatper);

      return this;
    }

    /**
     * Adds the chapter’s optional text.
     * @private
     * @returns {YouTubeChapters} YouTubeChapters
     */

  }, {
    key: '_addTextPoints',
    value: function _addTextPoints() {
      var _this2 = this;

      var textWrapper = (0, _query2.default)('#text-wrapper-' + this.ytc.id);
      (0, _query2.default)(this.ytc.options.chapters).each(function (index, current) {
        textWrapper.addElement('li', {
          class: 'text-point',
          id: 'text-point-' + current.id + '-' + _this2.ytc.id
        }, current.text);
      });

      return this;
    }

    /**
     * Adds the YouTube video script and sets up the YouTube video.
     * @private
     * @returns {YouTubeChapters} YouTubeChapters
     */

  }, {
    key: '_addYouTubeVideo',
    value: function _addYouTubeVideo() {
      var _this3 = this;

      if (window.YT && window.YT.Player) {
        this._playerSetup(this.ytc);
      } else {
        _players.push(function () {
          _this3._playerSetup(_this3.ytc);
        });
      }

      if (!window.onYouTubeIframeAPIReady) {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubePlayerAPIReady = function () {
          (0, _query2.default)(_players).each(function (index, player) {
            player();
          });
        };
      }

      return this;
    }

    /**
     * Sets up the player height and displays the YouTube player has
     * finished loading.
     * @private
     * @returns {YouTubeChapters} YouTubeChapters
     */

  }, {
    key: '_complete',
    value: function _complete() {
      var element = (0, _query2.default)(this.element);

      var iframeHeight = this.ytc.options.fluid ? element.find('#youtube-video-' + this.ytc.id).height() : this.ytc.options.height.replace('px', '');

      element.find('.chapters-wrapper').height(iframeHeight);

      element.find('.youtube-chapter-wrapper').addClass('complete');

      element.find('.loading').remove();

      return this;
    }

    /**
     * Calls the chaining methods such as play, pause, goToChatperId if there
     * are any within the this._playerReadyFunction array.
     * @private
     * @returns {YouTubeChapters} YouTubeChapters
     */

  }, {
    key: '_callPlayerReady',
    value: function _callPlayerReady() {
      (0, _query2.default)(this._playerReadyFunction).each(function (index, playerReady) {
        playerReady();
      });

      this._playerReadyFunction.length = 0;

      return this;
    }

    /**
     * Calls the ready method once the YouTube video has loaded.
     * @private
     * @returns {YouTubeChapters} YouTubeChapters
     */

  }, {
    key: '_callReady',
    value: function _callReady() {
      if (this._readyFunction.length) {
        this._readyFunction[0]();
      }

      return this;
    }

    /**
     * Sets up the player.
     * @param {object} params
     * @param {string} params.id - The random ID of the element.
     * @param {string} params.element - The element.
     * @param {object} params.player - The YouTube video player.
     * @param {object} params.options - The original options.
     * @private
     */

  }, {
    key: '_playerSetup',
    value: function _playerSetup(params) {
      var _this4 = this;

      /**
       * On ready method that is called once the video has finished playing.
       * @private
       */
      var onReady = function onReady() {
        _this4._complete()._callReady()._callPlayerReady();
      };

      /**
       * The method that runs while the YouTube video is being played.
       * @param {event} event
       * @private
       */
      var onStateChange = function onStateChange(event) {
        var chapters = (0, _query2.default)(_this4.element + ' .chapter-point-wrapper');
        var player = _this4.ytc.player;

        /**
         * The playing method that add the active class and shows the chapter text
         * to the current chapter.
         * @private
         */
        var playing = function playing() {
          chapters.each(function (index, element) {
            var current = (0, _query2.default)(element);
            var textPoint = (0, _query2.default)('#' + element.getAttribute('id').replace('chapter', 'text-point'));
            var time = parseFloat(current.attr('data-time'));
            var next = void 0;

            if (current.next().length > 0) {
              next = parseFloat(current.next().attr('data-time'));
            } else {
              next = player.getDuration();
            }

            current.removeClass('current');
            textPoint.removeClass('current');

            if (player.getCurrentTime() > time && player.getCurrentTime() < next) {
              current.addClass('current');
              if (!textPoint.isEmpty()) {
                textPoint.addClass('current');
              }
            }
          });
        };

        switch (event.data) {
          case YT.PlayerState.PLAYING:
            _this4._interval = setInterval(playing, 250);
            break;
          case YT.PlayerState.UNSTARTED:
          case YT.PlayerState.BUFFERING:
          case YT.PlayerState.CUED:
            break;
          case YT.PlayerState.PAUSED:
          case YT.PlayerState.ENDED:
            clearInterval(_this4._interval);
            break;
          default:
            clearInterval(_this4._interval);
            throw new Error('Something went wrong.');
        }
      };

      /**
       * The on error method if an error occurs while the video is being played.
       * @param {event} event
       * @private
       */
      var onError = function onError(event) {
        var errormsg = event.data;
        if (errormsg === 150 || errormsg === 101) {
          throw new Error('Error: An error has occurred while the video was loading.');
        }
        event.target.stopVideo();
      };

      params.player = new YT.Player(params.element, {
        height: params.options.height,
        width: params.options.width,
        videoId: params.options.youtubeId,
        playerVars: params.options.playerVars,
        events: {
          onReady: onReady,
          onStateChange: onStateChange,
          onError: onError
        }
      });
    }

    /**
     * Function seek to and play video.
     * @param {number} time - The time the video should seek to.
     * @private
     * @todo Add play and pause option
     */

  }, {
    key: '_seek',
    value: function _seek(time) {
      this.ytc.player.seekTo(time);
      this.ytc.player.playVideo();
    }

    /**
     * Ready function to call once the video has loaded.
     * @param {function} callback - Function callback after player is finished loading.
     * @param {YT} [callback.player] - The video player.
     * @example
     * YouTubeChapters(element, options)
     *   .ready(function(player) {
     *     ....
     *   });
     *
     * or
     *
     * let player = new YouTubeChapters();
     * player.ready(function(player) {
     *   ....
     * });
     *
     * @returns {YouTubeChapters} YouTubeChapters
     */

  }, {
    key: 'ready',
    value: function ready(callback) {
      var _this5 = this;

      if (typeof callback !== 'function') {
        throw new Error('ready method must include a function.');
      }

      if (window.YT && window.YT.Player) {
        callback.call(this);
      } else {
        this._readyFunction.push(function () {
          callback.call(_this5, _this5);
        });
      }

      return this;
    }

    /**
     * Goes to the position of the YouTube video.
     * @param {number|string} seekToTime - The time to seek to.
     * @example
     * YouTubeChapters(element, options)
     *   .seekTo('03:43'); or
     *   .seekTo('2m 0s'); or
     *   .seekTo(67);
     *
     * or
     *
     * let player = new YouTubeChapters(element, options);
     * player.seekTo('03:43'); or
     * player.seekTo('2m 0s'); or
     * player.seekTo(67);
     *
     * @returns {YouTubeChapters} YouTubeChapters
     */

  }, {
    key: 'seekTo',
    value: function seekTo(seekToTime) {
      var _this6 = this;

      var sTT = parseFloat((0, _helperFunctions.convertTime)(seekToTime));

      if (window.YT && window.YT.Player && this._playerReadyFunction.length === 0) {
        this._seek(sTT);
      } else {
        this._playerReadyFunction.push(function () {
          _this6._seek(sTT);
        });
      }

      return this;
    }

    /**
     * Goes to the video position of the chapter ID.
     * @param {string} id - ID of the chapter.
     * @example
     * YouTubeChapters(element, options)
     *   .goToChatperId('id1');
     *
     * or
     *
     * let player = new YouTubeChapters(element, options);
     * player.goToChatperId('id1');
     *
     * @returns {YouTubeChapters} YouTubeChapters
     */

  }, {
    key: 'goToChatperId',
    value: function goToChatperId(id) {
      var _this7 = this;

      var time = (0, _helperFunctions.getTime)(this.ytc.options.chapters, id);

      if (!time) {
        throw new Error('No id with ' + id + ' found.');
      }

      var seekToTime = parseFloat(time);

      if (window.YT && window.YT.Player && this._playerReadyFunction.length === 0) {
        this._seek(seekToTime);
      } else {
        this._playerReadyFunction.push(function () {
          _this7._seek(seekToTime);
        });
      }

      return this;
    }

    /**
     * Pauses the YouTube video.
     * @example
     * YouTubeChapters(element, options)
     *   .pause();
     *
     * or
     *
     * let player = new YouTubeChapters(element, options);
     * player.pause();
     *
     * @returns {YouTubeChapters} YouTubeChapters
     */

  }, {
    key: 'pause',
    value: function pause() {
      var _this8 = this;

      if (window.YT && window.YT.Player && this._playerReadyFunction.length === 0) {
        this.ytc.player.pauseVideo();
      } else {
        this._playerReadyFunction.push(function () {
          _this8.ytc.player.pauseVideo();
        });
      }

      return this;
    }

    /**
     * Plays the YouTube video.
     * @example
     * YouTubeChapters(element, options)
     *   .play();
     *
     * or
     *
     * let player = new YouTubeChapters(element, options);
     * player.play();
     *
     * @returns {YouTubeChapters} YouTubeChapters
     */

  }, {
    key: 'play',
    value: function play() {
      var _this9 = this;

      if (window.YT && window.YT.Player && this._playerReadyFunction.length === 0) {
        this.ytc.player.playVideo();
      } else {
        this._playerReadyFunction.push(function () {
          _this9.ytc.player.playVideo();
        });
      }

      return this;
    }

    /**
     * Static method so class doesn't have to be called with new.
     * @param {string} element - A DOM element to wrap in a YouTubeChapters object.
     * @param {object} options - The options for the YouTube video.
     * @private
     * @returns {YouTubeChapters} YouTubeChapters
     */

  }], [{
    key: 'setup',
    value: function setup(element, options) {
      return new YouTubeChapters(element, options);
    }
  }]);

  return YouTubeChapters;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Sets the default option of the input option if option is not set.
 * @param {any} option - Any option to check.
 * @param {any} def - What the default of the option should be if option is undefined.
 * @private
 * @returns {any} Either the orginal option or default option.
 */
function defaultOption(option, def) {
  if (!option || typeof option === 'undefined') {
    return def;
  }
  return option;
}

/**
 * Checks duplicate ids within an array.
 * @param {array} chapters - Array of chapters.
 * @private
 * @returns {bool} If ID is duplicate.
 */
function checkIds(chapters) {
  if (!chapters) {
    return false;
  }
  var ids = chapters.map(function (item) {
    return item.id;
  });
  return ids.some(function (item, idx) {
    return ids.indexOf(item) !== idx;
  });
}

/**
 * Returns the time from the chapter array.
 * @param {array} chapters - Array of chapters.
 * @param {string} id - Id to check within the chapters array.
 * @private
 * @returns {number} The time of the current chapter.
 */
function getTime(chapters, id) {
  if (!chapters) {
    return false;
  }

  for (var i = 0; i < chapters.length; i += 1) {
    if (chapters[i].id === id) {
      return convertTime(chapters[i].time);
    }
  }

  return null;
}

/**
 * Check if input is a number.
 * @param {string} value - Value to test.
 * @private
 * @returns {bool} If value is number or not.
 */
function _isNumber(value) {
  return (/^\d+$/.test(value)
  );
}

/**
 * Returns the duration into seconds.
 * @param {string} duration - Duration to convert.
 * @private
 * @returns {number} The duration.
 */
function convertTime(duration) {
  if (_isNumber(duration)) {
    return duration;
  }

  var match = duration.replace(/ /g, '').match(/(\d+h)?(\d+m)?(\d+s)?/);

  if (match[0]) {
    return (parseInt(match[1], 10) || 0) * 3600 + (parseInt(match[2], 10) || 0) * 60 + (parseInt(match[3], 10) || 0);
  }

  match = duration.split(':');

  if (match.length > 2) {
    return parseInt(match[0], 10) * 3600 + parseInt(match[1], 10) * 60 + parseInt(match[2], 10) * 1;
  }

  return parseInt(match[0], 10) * 60 + parseInt(match[1], 10) * 1;
}

/**
 * Sorts the array by time.
 * @param {array} array - The array to sort by time.
 * @private
 * @returns {array} The orginal array sorted.
 */
function sort(array) {
  return array.sort(function (a, b) {
    return convertTime(a.time) - convertTime(b.time);
  });
}

/**
 * Returns the default loading HTML.
 * @private
 * @returns {string} The default HTML for the loading.
 */
function loader() {
  return '<div class="loading-wrapper">' + '<p class="loading-text">Loading YouTube Video</p>' + '</div>';
}

exports.defaultOption = defaultOption;
exports.checkIds = checkIds;
exports.getTime = getTime;
exports.convertTime = convertTime;
exports.sort = sort;
exports.loader = loader;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _youtubeChapters = __webpack_require__(0);

__webpack_require__(1);

/**
 * Add YTC to window
 * @private
 */
/* YouTube Chapters */
window.YTC = _youtubeChapters.YouTubeChapters.setup;

/**
 * Export as YTC for shorter code.
 * @private
 */


/* Stylesheets */
exports.default = _youtubeChapters.YouTubeChapters.setup;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Main Q class
 *
 * @class Q
 * @example
 * let query = Q('elementID');
 */
var Q = function () {

  /**
   * Main constructor for Q class
   * @constructor
   * @param {string} element - A DOM element to wrap in a Q object.
   */
  function Q(element) {
    _classCallCheck(this, Q);

    if (!element) {
      this.length = 0;
      return;
    }

    if (Array.isArray(element)) {
      this.element = element;
    } else if (element.nodeType) {
      this.element = [];
      this.element[0] = element;
    } else {
      this.element = [];
      if (typeof element === 'string') {
        var nodes = document.querySelectorAll(element);
        for (var i = 0; i < nodes.length; i += 1) {
          this.element[i] = nodes[i];
        }
      }
    }

    this.length = this.element.length;
  }

  /**
   *Adds an element to the current queried element.
   * @param {string} tag - What tag the element is to be.
   * @param {object} object - Object of attributes.
   * @param {string} text - the inner text of the element.
   * @example
   * Q(element)
   *   .addElement('div', {
   *     class: 'elementClass,
   *     id: 'elementID',
   *     style: 'height: 100px',
   *   });
   */


  _createClass(Q, [{
    key: 'addElement',
    value: function addElement(tag, object, text) {
      var crEl = document.createElement(tag);
      if (object) {
        new Q(crEl).attr(object);
      }
      if (text) {
        crEl.innerHTML = text;
      }
      if (this.element.length) {
        for (var i = 0; i < this.element.length; i += 1) {
          this.element[i].appendChild(crEl);
        }
      } else {
        this.element.appendChild(crEl);
      }
      return this;
    }

    /**
     * Gets all element of that are found from the current element.
     * @param {string} element - A DOM element to wrap in a Q object.
     * @example
     * Q(element)
     *   .find('element');
     *
     * @returns {Q} Q
     */

  }, {
    key: 'find',
    value: function find(element) {
      var results = [];
      for (var i = 0; i < this.length; i += 1) {
        var current = this.element[i].querySelectorAll(element);
        if (current) {
          for (var j = 0; j < current.length; j += 1) {
            results.push(current[j]);
          }
        }
      }

      return new Q(results);
    }

    /**
     * Attachs an event handler function to the selected elements.
     * @param {string} eventName - What the event should be.
     * @param {function} eventHandler - The function to attach to the event.
     * @example
     * Q(element)
     *   .addEvent('click', function () {
     *     ....
     *   });
     *
     */

  }, {
    key: 'addEvent',
    value: function addEvent(eventName, eventHandler) {
      for (var i = 0; i < this.length; i += 1) {
        this.element[i].addEventListener(eventName, eventHandler, false);
      }

      return this;
    }

    /**
     * Iterate over an array, executing a function for each matched element.
     * @param {function} callback - The function that will be executed on every object.
     * @param {number} [callback.index] - The current index of the current element.
     * @param {element} [callback.element] - The single element in the elements list.
     * @example
     * Q(element)
     *   .each(function (index, element) {
     *     ....
     *   });
     *
     * @returns {Q} Q
     */

  }, {
    key: 'each',
    value: function each(callback) {
      var end = void 0;
      for (var i = 0; i < this.length; i += 1) {
        end = callback.call(this.element[i], i, this.element[i]);
        if (end === false) {
          break;
        }
      }

      return this;
    }

    /**
     * Adds the class name from all current elements.
     * @param {string} className - class to remove.
     * @example
     * Q(element)
     *   .addClass('className');
     *
     * @returns {Q} Q
     */

  }, {
    key: 'addClass',
    value: function addClass(className) {
      if (this.element.length > 0) {
        for (var i = 0; i < this.element.length; i += 1) {
          this.element[i].classList.add(className);
        }
      }

      return this;
    }

    /**
     * Remove the class name from all current elements.
     * @param {string} className - class to remove.
     * @example
     * Q(element)
     *   .removeClass('className');
     *
     * @returns {Q} Q
     */

  }, {
    key: 'removeClass',
    value: function removeClass(className) {
      if (this.element.length > 0) {
        for (var i = 0; i < this.element.length; i += 1) {
          this.element[i].classList.remove(className);
        }
      }

      return this;
    }

    /**
     * Either sets or gets the height of the current element.
     * @param {string} [height] - optional set height value.
     * @example
     *
     * Get:
     * Q(element)
     *   .height();
     *
     * or
     *
     * Set:
     * Q(element)
     *   .height(200);
     *
     * @returns {number|Q} Height value or Q
     */

  }, {
    key: 'height',
    value: function height(_height) {
      if (_height) {
        for (var i = 0; i < this.element.length; i += 1) {
          this.element[i].style.height = _height + 'px';
        }
      } else {
        return this.element[0].clientHeight;
      }

      return this;
    }

    /**
     * Either sets or gets the width of the current element.
     * @param {string} [width] - optional set width value.
     * @example
     *
     * Get:
     * Q(element)
     *   .width();
     *
     * or
     *
     * Set:
     * Q(element)
     *   .width(200);
     *
     * @returns {number|Q} Width value or Q.
     */

  }, {
    key: 'width',
    value: function width(_width) {
      if (_width) {
        for (var i = 0; i < this.element.length; i += 1) {
          this.element[i].style.width = _width + 'px';
        }
      } else {
        return this.element[0].clientWidth;
      }

      return this;
    }

    /**
     * Either adds the attribute if object of attributes to add or
     * returns the attrbutes if string input.
     * @param {string|object} attr - attrribute.
     * @example
     * Get
     * Q(element)
     *   .attr('class');
     *
     * or
     *
     * Set:
     * Q(element)
     *   .attr({
     *     class: 'elementClass,
     *     id: 'elementID',
     *     style: 'height: 100px',
     *   });
     *
     * @returns {string|Q} Attribute value or Q.
     */

  }, {
    key: 'attr',
    value: function attr(_attr) {
      var _this = this;

      if (typeof _attr === 'string') {
        return this.element[0].getAttribute(_attr);
      }

      Object.keys(_attr).forEach(function (key) {
        for (var i = 0; i < _this.element.length; i += 1) {
          if (key.indexOf('data') > -1) {
            _this.element[i].dataset[key.toLowerCase().replace('data', '')] = _attr[key];
          } else {
            _this.element[i].setAttribute(key, _attr[key]);
          }
        }
      });

      return this;
    }

    /**
     * Removes the current element.
     * @example
     * Q(element)
     *   .remove()
     *
     * @returns {Q} Q
     */

  }, {
    key: 'remove',
    value: function remove() {
      for (var i = 0; i < this.element.length; i += 1) {
        this.element[i].parentNode.removeChild(this.element[i]);
      }

      this.length = this.element.length;

      return this;
    }

    /**
     * Return the next element of the current element.
     * @example
     * Q(element)
     *   .next();
     *
     * @returns {Q} New query of the next element.
     */

  }, {
    key: 'next',
    value: function next() {
      return new Q(this.element[0].nextElementSibling);
    }

    /**
     * Return is current element is empty of not.
     * @example
     * Q(element)
     *   .isEmpty();
     *
     * @returns {bool} If is empty or not.
     */

  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.element[0].innerHTML.trim() === '';
    }

    /**
     * Returns parent node of the current element.
     * @example
     * Q(element)
     *   .parent();
     *
     * @returns {Q} New query of the parent element.
     */

  }, {
    key: 'parent',
    value: function parent() {
      return new Q(this.element[0].parentNode);
    }

    /**
     * Returns new Q.
     * @param {string} element - A DOM element to wrap in a Q object.
     * @private
     * @returns {Q} New Q class.
     */

  }], [{
    key: 'findSelector',
    value: function findSelector(element) {
      return new Q(element);
    }
  }]);

  return Q;
}();

exports.default = Q.findSelector;
module.exports = exports['default'];

/***/ })
/******/ ]);
});