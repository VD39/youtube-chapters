/**
 * Created by Vijay Dubb on 27/10/2015.
 */
(function (global, window, document) {
  'use strict';

  function YTChapter(element, options) {

    if (this instanceof YTChapter) {
      this.element = element;
      this.options = options;
    } else {
      return new YTChapter(element, options);
    }

    for (var i = 0; i < elements.length; i++) {
      if (elements[i] === this.element) {
        throw new Error('An instance of YTChapter with element ' + this.element + ' already exists.');
      }
    }

    if (!this.element || typeof this.element !== 'string') {
      throw new Error('Element has not been set, please set element');
    }

    if (Query(this.element).length < 1) {
      throw new Error('Element ' + this.element + ' does not exsit.');
    }

    options = defaultOption(options, {});

    if (checkIds(options.chapters)) {
      throw new Error('All ID\'s must be unqiue');
    }

    this.ytc = {};
    this.randomNumber = Math.floor(Math.random() * 99999);
    this.ytc.element = 'youtube-iframe-' + this.randomNumber;
    this.ytc.player = null;
    this.ytc.options = {
      youtubeId: defaultOption(options.youtubeId, 'bHQqvYy5KYo'),
      fluid: defaultOption(options.fluid, false),
      playerVars: defaultOption(options.playerVars, {}),
      height: defaultOption(options.height, '100%'),
      width: defaultOption(options.width, '100%'),
      showTime: defaultOption(options.showTime, false),
      chapters: defaultOption(options.chapters, [])
    };

    this._init();
  }

  var _interval;
  var elements = [];
  var ytcp = YTChapter.prototype;

  ytcp._init = function () {
    elements.push(this.element);
    this._buildStruture()
      ._addChapters()
      ._addYouTubeVideo();
  };

  ytcp._buildStruture = function () {
    Query(this.element)
      .attr({
        'style': 'max-width:' + this.ytc.options.width
      })
      .add('div', {
        'class': 'youtube-video-' + this.randomNumber + (this.ytc.options.fluid ? ' fluid-wrapper' : '')
      })
      .add('div', {
        'class': 'chapters-wrapper-' + this.randomNumber
      });

    Query('.youtube-video-' + this.randomNumber)
      .add('div', {
        'class': this.ytc.element,
        'id': this.ytc.element
      });

    return this;
  };

  ytcp._addChapters = function () {
    var _this = this;

    var goToChatper = function (event) {
      event.preventDefault();
      _this.ytc.player.seekTo(event.currentTarget.getAttribute('data-time'));
      setTimeout(function () {
        _this.ytc.player.playVideo();
      }, 500);
    };

    var chaptersWrapper = Query('.chapters-wrapper-' + _this.randomNumber);

    for (var index = 0; index < _this.ytc.options.chapters.length; index++) {
      var current = _this.ytc.options.chapters[index];
      chaptersWrapper.add('div', {
        'class': 'chapter-' + current.id
      });
      Query('.chapter-' + current.id)
        .add('div', {
          'class': 'chapter-point',
          'id': current.id,
          'href': current.id,
          'data-time': convertTime(current.time)
        }, current.title)
        .next()
        .addEvent('click', goToChatper)
        .add('span', {
          'class': 'time'
        }, (_this.ytc.options.showTime ? current.time : ''));
    }
    return this;
  };

  ytcp._addYouTubeVideo = function () {
    var _this = this;

    function onPlayerError() {
      var errormsg = event.data;
      if (errormsg === 150 || errormsg === 101) {
        window.alert('Error: An error has occurred');
      }
      event.target.stopVideo();
    }

    function onStateChange(event) {

      var _chapters1 = Query('.chapter-point');

      var playing = function () {
        _chapters1.each(function (index, el, allEl) {
          el.classList.remove('current');
          var time = el.getAttribute('data-time');
          var next = null;
          if (allEl[index + 1]) {
            next = allEl[index + 1].getAttribute('data-time');
          } else {
            next = _this.ytc.player.getDuration();
          }
          if (_this.ytc.player.getCurrentTime() > time && _this.ytc.player.getCurrentTime() < next) {
            el.classList.add('current');
          }
        });
      };

      switch (event.data) {
      case YT.PlayerState.PLAYING:
        _interval = setInterval(playing, 500);
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
    }

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = function () {
      _this.ytc.player = new YT.Player(_this.ytc.element, {
        height: _this.ytc.options.height,
        width: _this.ytc.options.width,
        videoId: _this.ytc.options.youtubeId,
        playerVars: _this.ytc.options.playerVars,
        events: {
          'onReady': function () { },
          'onStateChange': onStateChange,
          'onError': onPlayerError
        }
      });
    };

    return this;
  };

  //helper functions
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

  function convertTime(duration) {
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

  //jQuery clone to suit purpose of element building
  function Query(element) {
    if (this instanceof Query) {
      this.element = document.querySelectorAll(element);
      this.length = this.element.length;
    } else {
      return new Query(element);
    }
  }

  Query.prototype.add = function (createEl, object, text) {
    var crEl = document.createElement(createEl);
    if (object) {
      this.attr(object, crEl);
    }
    if (text) {
      crEl.innerText = text;
    }
    if (this.element.length) {
      for (var i = 0; i < this.element.length; i++) {
        this.element[i].appendChild(crEl);
      }
    } else {
      this.element.appendChild(crEl);
    }
    return this;
  };

  Query.prototype.addEvent = function (eventName, eventHandler) {
    this.element.addEventListener(eventName, eventHandler, true);
    return this;
  };

  Query.prototype.each = function (callback) {
    var end;
    for (var i = 0; i < this.length; i++) {
      end = callback.call(this.element[i], i, this.element[i], this.element);
      if (end === false) {
        break;
      }
    }
    return this;
  };

  Query.prototype.next = function () {
    this.element = this.element[0].firstChild;
    return this;
  };

  Query.prototype.attr = function (attr, _element) {
    if (typeof attr === 'string') {
      return this.element[0].getAttribute(attr);
    }
    for (var key in attr) {
      if (attr.hasOwnProperty(key)) {
        if (_element) {
          _element.setAttribute(key, attr[key]);
        } else {
          for (var i = 0; i < this.element.length; i++) {
            this.element[i].setAttribute(key, attr[key]);
          }
        }
      }
    }
    return this;
  };

  window.YTC = YTChapter;

})(this, window, document);