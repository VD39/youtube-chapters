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
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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

var elements = [];
var players = [];
var _onReady = [];
var _interval = void 0;

var YouTubeChapters = exports.YouTubeChapters = function () {
  function YouTubeChapters(element, options) {
    _classCallCheck(this, YouTubeChapters);

    this.element = element;
    this.options = options;

    for (var i = 0; i < elements.length; i++) {
      if (elements[i] === this.element) {
        throw new Error('An instance of YouTubeChapters with element ' + this.element + ' already exists.');
      }
    }

    if (!this.element || typeof this.element !== 'string') {
      throw new Error('Element has not been set, please set an element.');
    }

    if (_query2.default.Query(this.element).length < 1) {
      throw new Error('Element ' + this.element + ' does not exsit.');
    }

    options = (0, _helperFunctions.defaultOption)(options, {});

    if ((0, _helperFunctions.checkIds)(options.chapters)) {
      throw new Error('All ID\'s must be unqiue');
    }

    this.ytc = {};
    this.randomNumber = Math.floor(Math.random() * 99999);
    this.ytc.element = 'youtube-iframe-' + this.randomNumber;
    this.ytc.player = null;
    this.ytc.options = {
      youtubeId: (0, _helperFunctions.defaultOption)(options.youtubeId, 'bHQqvYy5KYo'),
      fluid: (0, _helperFunctions.defaultOption)(options.fluid, false),
      playerVars: (0, _helperFunctions.defaultOption)(options.playerVars, {}),
      height: (0, _helperFunctions.defaultOption)(options.height, '100%'),
      width: (0, _helperFunctions.defaultOption)(options.width, '100%'),
      showTime: (0, _helperFunctions.defaultOption)(options.showTime, false),
      chapters: (0, _helperFunctions.sort)((0, _helperFunctions.defaultOption)(options.chapters, []))
    };

    this._init();
  }

  _createClass(YouTubeChapters, [{
    key: '_init',
    value: function _init() {
      elements.push(this.element);
      this._buildStruture()._addChapterPoints()._addTextPoints()._addYouTubeVideo();
    }
  }, {
    key: '_buildStruture',
    value: function _buildStruture() {
      var mainElement = _query2.default.Query(this.element);

      mainElement.addElement('div', {
        'class': 'loading'
      }, 'Loading setup....').addElement('div', {
        'class': 'youtube-chapter-wrapper'
      });

      mainElement.find('.youtube-chapter-wrapper').addElement('div', {
        'class': 'youtube-wrapper',
        'style': 'max-width: ' + this.ytc.options.width
      }).addElement('div', {
        'class': 'chapters-wrapper'
      }).addElement('div', {
        'class': 'text-wrapper'
      }).find('.youtube-wrapper').addElement('div', {
        'class': 'youtube-video ' + (this.ytc.options.fluid ? 'fluid-wrapper' : ''),
        'id': 'youtube-video-' + this.randomNumber
      }).find('.youtube-video').addElement('div', {
        'class': 'youtube-iframe',
        'id': this.ytc.element
      });

      mainElement.find('.chapters-wrapper').addElement('ul', {
        'id': 'chapters-wrapper-' + this.randomNumber
      });

      mainElement.find('.text-wrapper').addElement('ul', {
        'id': 'text-wrapper-' + this.randomNumber
      });

      return this;
    }
  }, {
    key: '_addChapterPoints',
    value: function _addChapterPoints() {
      var _this = this;

      var goToChatper = function goToChatper(event) {
        event.preventDefault();
        _this.seekTo(event.currentTarget.getAttribute('data-time'));
      };

      var chaptersWrapper = _query2.default.Query('#chapters-wrapper-' + this.randomNumber);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.ytc.options.chapters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var current = _step.value;

          chaptersWrapper.addElement('li', {
            'class': 'chapter-point-wrapper',
            'id': 'chapter-' + current.id + '-' + this.randomNumber,
            'data-time': (0, _helperFunctions.convertTime)(current.time)
          }).find('li.chapter-point-wrapper').addElement('div', {
            'class': 'chapter-point',
            'id': 'chapter-point-' + current.id + '-' + this.randomNumber
          }, current.title).find('.chapter-point').addElement('span', {
            'class': 'time'
          }, this.ytc.options.showTime ? current.time : '');
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      chaptersWrapper.find('li.chapter-point-wrapper').addEvent('click', goToChatper);

      return this;
    }
  }, {
    key: '_addTextPoints',
    value: function _addTextPoints() {
      var textWrapper = _query2.default.Query('#text-wrapper-' + this.randomNumber);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.ytc.options.chapters[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var current = _step2.value;

          textWrapper.addElement('li', {
            'class': 'text-point',
            'id': 'text-point-' + current.id + '-' + this.randomNumber
          }, current.text);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this;
    }
  }, {
    key: '_addYouTubeVideo',
    value: function _addYouTubeVideo() {
      var _this2 = this;

      if (window.YT && window.YT.Player) {

        this.playerSetup(this.ytc);
      } else {

        if (!window.onYouTubeIframeAPIReady) {

          var tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

          window.onYouTubePlayerAPIReady = function () {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = players[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var player = _step3.value;

                player();
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          };
        }

        players.push(function () {
          _this2.playerSetup(_this2.ytc);
        });
      }

      return this;
    }
  }, {
    key: 'complete',
    value: function complete() {
      var element = _query2.default.Query(this.element);

      var iframeHeight = element.find('#youtube-video-' + this.randomNumber).height();

      element.find('.chapters-wrapper').height(iframeHeight);

      element.find('.youtube-chapter-wrapper').addClass('complete');

      element.find('.loading').remove();
    }
  }, {
    key: 'playerSetup',
    value: function playerSetup(params) {
      var _this3 = this;

      var onPlayerError = function onPlayerError(event) {
        var errormsg = event.data;
        if (errormsg === 150 || errormsg === 101) {
          window.alert('Error: An error has occurred');
        }
        event.target.stopVideo();
      };

      var onStateChange = function onStateChange(event) {

        var chapters = _query2.default.Query(_this3.element + ' .chapter-point-wrapper');

        var playing = function playing() {
          chapters.each(function (index, element) {
            var textPoint = _query2.default.Query('#' + element.getAttribute('id').replace('chapter', 'text-point'));

            var time = parseFloat(element.getAttribute('data-time'));
            var next = void 0;

            if (chapters.element[index + 1]) {
              next = parseFloat(chapters.element[index + 1].getAttribute('data-time'));
            } else {
              next = _this3.ytc.player.getDuration();
            }

            element.classList.remove('current');
            textPoint.removeClass('current');

            if (_this3.ytc.player.getCurrentTime() > time && _this3.ytc.player.getCurrentTime() < next) {
              element.classList.add('current');
              if (!textPoint.isEmpty()) {
                textPoint.addClass('current');
              }
            }
          });
        };

        switch (event.data) {
          case YT.PlayerState.PLAYING:
            _interval = setInterval(playing, 250);
            break;
          case YT.PlayerState.UNSTARTED:
          case YT.PlayerState.BUFFERING:
          case YT.PlayerState.CUED:
            break;
          case YT.PlayerState.PAUSED:
          case YT.PlayerState.ENDED:
            clearInterval(_interval);
            break;
          default:
            throw new Error('Something went wrong.');
        }
      };

      params.player = new YT.Player(params.element, {
        height: params.options.height,
        width: params.options.width,
        videoId: params.options.youtubeId,
        playerVars: params.options.playerVars,
        events: {
          'onReady': function onReady() {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = _onReady[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var callReady = _step4.value;

                callReady();
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }

            _onReady.length = 0;
            _this3.complete();
          },
          'onStateChange': onStateChange,
          'onError': onPlayerError
        }
      });
    }
  }, {
    key: 'seek',
    value: function seek(time) {
      this.ytc.player.seekTo(time);
      this.ytc.player.playVideo();
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seekToTime) {
      var _this4 = this;

      seekToTime = parseFloat((0, _helperFunctions.convertTime)(seekToTime));

      if (window.YT && window.YT.Player && _onReady.length === 0) {
        this.seek(seekToTime);
      } else {
        _onReady.push(function () {
          _this4.seek(seekToTime);
        });
      }

      return this;
    }
  }, {
    key: 'goToChatperId',
    value: function goToChatperId(id) {
      var _this5 = this;

      var time = (0, _helperFunctions.getTime)(this.ytc.options.chapters, id);

      if (!time) {
        throw new Error('No id with ' + id + ' found.');
      }

      var seekToTime = parseFloat(time);

      if (window.YT && window.YT.Player && _onReady.length === 0) {
        this.seek(seekToTime);
      } else {
        _onReady.push(function () {
          _this5.seek(seekToTime);
        });
      }

      return this;
    }
  }, {
    key: 'pause',
    value: function pause() {
      var _this6 = this;

      if (window.YT && window.YT.Player && _onReady.length === 0) {
        this.ytc.player.pauseVideo();
      } else {
        _onReady.push(function () {
          _this6.ytc.player.pauseVideo();
        });
      }

      return this;
    }
  }, {
    key: 'play',
    value: function play() {
      var _this7 = this;

      if (window.YT && window.YT.Player && _onReady.length === 0) {
        this.ytc.player.playVideo();
      } else {
        _onReady.push(function () {
          _this7.ytc.player.playVideo();
        });
      }

      return this;
    }
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
function defaultOption(option, def) {
  if (!option || typeof option === 'undefined') {
    return def;
  }
  return option;
}

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

function getTime(chapters, id) {
  if (!chapters) {
    return false;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = chapters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var chapter = _step.value;

      if (chapter.id === id) {
        return convertTime(chapter.time);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return null;
}

function _isNumber(value) {
  return (/^\d+$/.test(value)
  );
}

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
  } else {
    return parseInt(match[0], 10) * 60 + parseInt(match[1], 10) * 1;
  }
}

function sort(array) {
  return array.sort(function (a, b) {
    return convertTime(a.time) - convertTime(b.time);
  });
}

exports.defaultOption = defaultOption;
exports.checkIds = checkIds;
exports.getTime = getTime;
exports.convertTime = convertTime;
exports.sort = sort;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(1);

var _youtubeChapters = __webpack_require__(0);

/* Stylesheets */
exports.default = _youtubeChapters.YouTubeChapters.setup;

/* YouTube Chapters */

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

//jQuery clone to suit purpose of element building
var $_ = function () {
  function $_(element) {
    _classCallCheck(this, $_);

    if (Array.isArray(element)) {
      this.element = element;
    } else {
      this.element = [];
      if (typeof element === "string") {
        var nodes = document.querySelectorAll(element);
        for (var i = 0; i < nodes.length; i++) {
          this.element[i] = nodes[i];
        }
      }
    }

    this.length = this.element.length;
  }

  _createClass($_, [{
    key: "addElement",
    value: function addElement(tag, object, text) {
      var crEl = document.createElement(tag);
      if (object) {
        this.attr(object, crEl);
      }
      if (text) {
        crEl.innerHTML = text;
      }
      if (this.element.length) {
        for (var i = 0; i < this.element.length; i++) {
          this.element[i].appendChild(crEl);
        }
      } else {
        this.element.appendChild(crEl);
      }
      return this;
    }
  }, {
    key: "find",
    value: function find(element) {
      var results = [];
      for (var i = 0; i < this.length; i++) {
        var current = this.element[i].querySelectorAll(element);
        if (current) {
          for (var j = 0; j < current.length; j++) {
            results.push(current[j]);
          }
        }
      }
      return new $_(results);
    }
  }, {
    key: "addEvent",
    value: function addEvent(eventName, eventHandler) {
      for (var i = 0; i < this.length; i++) {
        this.element[i].addEventListener(eventName, eventHandler, false);
      }
      return this;
    }
  }, {
    key: "each",
    value: function each(callback) {
      var end = void 0;
      for (var i = 0; i < this.length; i++) {
        end = callback.call(this.element[i], i, this.element[i]);
        if (end === false) {
          break;
        }
      }
      return this;
    }
  }, {
    key: "addClass",
    value: function addClass(className) {
      if (this.element.length > 0) {
        for (var i = 0; i < this.element.length; i++) {
          this.element[i].classList.add(className);
        }
      }
      return this;
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      if (this.element.length > 0) {
        for (var i = 0; i < this.element.length; i++) {
          this.element[i].classList.remove(className);
        }
      }
      return this;
    }
  }, {
    key: "height",
    value: function height(_height) {
      if (_height) {
        for (var i = 0; i < this.element.length; i++) {
          this.element[i].style.height = _height + "px";
        }
      } else {
        return this.element[0].clientHeight;
      }
      return this;
    }
  }, {
    key: "attr",
    value: function attr(_attr, _element) {
      if (typeof _attr === 'string') {
        return this.element[0].getAttribute(_attr);
      }
      for (var key in _attr) {
        if (_attr.hasOwnProperty(key)) {
          if (_element) {
            _element.setAttribute(key, _attr[key]);
          } else {
            for (var i = 0; i < this.element.length; i++) {
              this.element[i].setAttribute(key, _attr[key]);
            }
          }
        }
      }
      return this;
    }
  }, {
    key: "remove",
    value: function remove() {
      for (var i = 0; i < this.element.length; i++) {
        this.element[i].parentNode.removeChild(this.element[i]);
      }
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.element[0].innerHTML.trim() === "";
    }
  }], [{
    key: "Query",
    value: function Query(element) {
      return new $_(element);
    }
  }]);

  return $_;
}();

exports.default = $_;
module.exports = exports['default'];

/***/ })
/******/ ]);
});