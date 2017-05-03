import {
  defaultOption,
  checkIds,
  getTime,
  convertTime,
  sort,
  loader,
} from '../helper-functions';
import Q from '../query';

const _elements = []; // Elements array to store the elements
const _players = []; // Players array to store the current players

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
export class YouTubeChapters {

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
  constructor(element, options) {
    this.options = defaultOption(options, {});

    for (let i = 0; i < _elements.length; i += 1) {
      if (_elements[i] === element) {
        throw new Error(`An instance of YouTubeChapters with element ${element} already exists.`);
      }
    }

    if (!element || typeof element !== 'string') {
      throw new Error('Element has not been set, please set an element.');
    }

    if (Q(element).length < 1) {
      throw new Error(`Element ${this.element} does not exsit.`);
    }

    this._interval = null;
    this._playerReadyFunction = [];
    this._readyFunction = [];
    this.element = element;
    this.ytc = {};
    this.ytc.id = defaultOption(this.options.id, Math.floor(Math.random() * 99999));
    this.ytc.element = `youtube-iframe-${this.ytc.id}`;
    this.ytc.player = null;
    this.ytc.options = {
      youtubeId: defaultOption(this.options.youtubeId, 'bHQqvYy5KYo'),
      loader: defaultOption(this.options.loader, loader()),
      fluid: defaultOption(this.options.fluid, false),
      playerVars: defaultOption(this.options.playerVars, {}),
      width: defaultOption(this.options.width, '500px'),
      height: defaultOption(this.options.height, '350px'),
      showTime: defaultOption(this.options.showTime, false),
      chapters: sort(defaultOption(this.options.chapters, []))
    };

    if (checkIds(this.options.chapters)) {
      throw new Error('All ID\'s must be unqiue');
    }

    this._init();
  }

  /**
   * Begin the initialisation of the library.
   * @private
   * @returns {YouTubeChapters} YouTubeChapters
   */
  _init() {
    _elements.push(this.element);
    this._buildStruture()
      ._addChapterPoints()
      ._addTextPoints()
      ._addYouTubeVideo();
  }

  /**
   * Builds the main structure of YouTube frame.
   * @private
   * @returns {YouTubeChapters} YouTubeChapters
   */
  _buildStruture() {
    const mainElement = Q(this.element);

    mainElement
      .addElement('div', {
        class: 'loading'
      }, this.ytc.options.loader)
      .addElement('div', {
        class: 'youtube-chapter-wrapper',
      });

    mainElement
      .find('.loading')
      .width(mainElement.parent().width());

    mainElement
      .find('.youtube-chapter-wrapper')
      .addElement('div', {
        class: 'youtube-wrapper',
        style: `max-width: ${this.ytc.options.width}`
      })
      .addElement('div', {
        class: 'chapters-wrapper'
      })
      .addElement('div', {
        class: 'text-wrapper'
      })
      .find('.youtube-wrapper')
      .addElement('div', {
        class: `youtube-video ${this.ytc.options.fluid ? 'fluid-wrapper' : ''}`,
        id: `youtube-video-${this.ytc.id}`
      })
      .find('.youtube-video')
      .addElement('div', {
        class: 'youtube-iframe',
        id: this.ytc.element
      });

    mainElement
      .find('.chapters-wrapper')
      .addElement('ul', {
        id: `chapters-wrapper-${this.ytc.id}`
      });

    mainElement
      .find('.text-wrapper')
      .addElement('ul', {
        id: `text-wrapper-${this.ytc.id}`
      });

    return this;
  }

  /**
   * Add the chapter points to the YouTube player frame.
   * @private
   * @returns {YouTubeChapters} YouTubeChapters
   */
  _addChapterPoints() {
    /**
     * Sets the click event to each chapter point.
     * @private
     * @param {event} event
     */
    const goToChatper = event => {
      event.preventDefault();
      this.seekTo(event.currentTarget.getAttribute('data-time'));
    };

    const chaptersWrapper = Q(`#chapters-wrapper-${this.ytc.id}`);

    Q(this.ytc.options.chapters).each((index, current) => {
      chaptersWrapper
        .addElement('li', {
          class: 'chapter-point-wrapper',
          id: `chapter-${current.id}-${this.ytc.id}`,
          dataTime: convertTime(current.time)
        })
        .find('li.chapter-point-wrapper')
        .addElement('div', {
          class: 'chapter-point',
          id: `chapter-point-${current.id}-${this.ytc.id}`
        }, current.title)
        .find('.chapter-point')
        .addElement('span', {
          class: 'time'
        }, (this.ytc.options.showTime ? current.time : ''));
    });

    chaptersWrapper
      .find('li.chapter-point-wrapper')
      .addEvent('click', goToChatper);

    return this;
  }

  /**
   * Adds the chapter’s optional text.
   * @private
   * @returns {YouTubeChapters} YouTubeChapters
   */
  _addTextPoints() {
    const textWrapper = Q(`#text-wrapper-${this.ytc.id}`);
    Q(this.ytc.options.chapters).each((index, current) => {
      textWrapper
        .addElement('li', {
          class: 'text-point',
          id: `text-point-${current.id}-${this.ytc.id}`
        }, current.text);
    });

    return this;
  }

  /**
   * Adds the YouTube video script and sets up the YouTube video.
   * @private
   * @returns {YouTubeChapters} YouTubeChapters
   */
  _addYouTubeVideo() {
    if (window.YT && window.YT.Player) {
      this._playerSetup(this.ytc);
    } else {
      _players.push(() => {
        this._playerSetup(this.ytc);
      });
    }

    if (!window.onYouTubeIframeAPIReady) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubePlayerAPIReady = () => {
        Q(_players).each((index, player) => {
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
  _complete() {
    const element = Q(this.element);

    const iframeHeight = this.ytc.options.fluid ? element
      .find(`#youtube-video-${this.ytc.id}`)
      .height() :
      this.ytc.options.height.replace('px', '');

    element
      .find('.chapters-wrapper')
      .height(iframeHeight);

    element
      .find('.youtube-chapter-wrapper')
      .addClass('complete');

    element
      .find('.loading')
      .remove();

    return this;
  }

  /**
   * Calls the chaining methods such as play, pause, goToChatperId if there
   * are any within the this._playerReadyFunction array.
   * @private
   * @returns {YouTubeChapters} YouTubeChapters
   */
  _callPlayerReady() {
    Q(this._playerReadyFunction).each((index, playerReady) => {
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
  _callReady() {
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
  _playerSetup(params) {
    /**
     * On ready method that is called once the video has finished playing.
     * @private
     */
    const onReady = () => {
      this._complete()
        ._callReady()
        ._callPlayerReady();
    };

    /**
     * The method that runs while the YouTube video is being played.
     * @param {event} event
     * @private
     */
    const onStateChange = event => {
      const chapters = Q(`${this.element} .chapter-point-wrapper`);
      const player = this.ytc.player;

      /**
       * The playing method that add the active class and shows the chapter text
       * to the current chapter.
       * @private
       */
      const playing = () => {
        chapters.each((index, element) => {
          const current = Q(element);
          const textPoint = Q(`#${element.getAttribute('id').replace('chapter', 'text-point')}`);
          const time = parseFloat(current.attr('data-time'));
          let next;

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
          this._interval = setInterval(playing, 250);
          break;
        case YT.PlayerState.UNSTARTED:
        case YT.PlayerState.BUFFERING:
        case YT.PlayerState.CUED:
          break;
        case YT.PlayerState.PAUSED:
        case YT.PlayerState.ENDED:
          clearInterval(this._interval);
          break;
        default:
          clearInterval(this._interval);
          throw new Error('Something went wrong.');
      }
    };

    /**
     * The on error method if an error occurs while the video is being played.
     * @param {event} event
     * @private
     */
    const onError = event => {
      const errormsg = event.data;
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
        onReady,
        onStateChange,
        onError
      }
    });
  }

  /**
   * Function seek to and play video.
   * @param {number} time - The time the video should seek to.
   * @private
   * @todo Add play and pause option
   */
  _seek(time) {
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
  ready(callback) {
    if (typeof callback !== 'function') {
      throw new Error('ready method must include a function.');
    }

    if (window.YT && window.YT.Player) {
      callback.call(this);
    } else {
      this._readyFunction.push(() => {
        callback.call(this, this);
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
  seekTo(seekToTime) {
    const sTT = parseFloat(convertTime(seekToTime));

    if (window.YT && window.YT.Player && this._playerReadyFunction.length === 0) {
      this._seek(sTT);
    } else {
      this._playerReadyFunction.push(() => {
        this._seek(sTT);
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
  goToChatperId(id) {
    const time = getTime(this.ytc.options.chapters, id);

    if (!time) {
      throw new Error(`No id with ${id} found.`);
    }

    const seekToTime = parseFloat(time);

    if (window.YT && window.YT.Player && this._playerReadyFunction.length === 0) {
      this._seek(seekToTime);
    } else {
      this._playerReadyFunction.push(() => {
        this._seek(seekToTime);
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
  pause() {
    if (window.YT && window.YT.Player && this._playerReadyFunction.length === 0) {
      this.ytc.player.pauseVideo();
    } else {
      this._playerReadyFunction.push(() => {
        this.ytc.player.pauseVideo();
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
  play() {
    if (window.YT && window.YT.Player && this._playerReadyFunction.length === 0) {
      this.ytc.player.playVideo();
    } else {
      this._playerReadyFunction.push(() => {
        this.ytc.player.playVideo();
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
  static setup(element, options) {
    return new YouTubeChapters(element, options);
  }
}
