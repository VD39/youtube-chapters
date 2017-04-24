import {
  defaultOption,
  checkIds,
  getTime,
  convertTime,
  sort
} from '../helper-functions';
import $_ from '../query';

let elements = [];
let players = [];
let onReady = [];
let _interval;

export class YouTubeChapters {
  constructor(element, options) {

    this.element = element;
    this.options = options;

    for (let i = 0; i < elements.length; i++) {
      if (elements[i] === this.element) {
        throw new Error(`An instance of YouTubeChapters with element ${this.element} already exists.`);
      }
    }

    if (!this.element || typeof this.element !== 'string') {
      throw new Error('Element has not been set, please set an element.');
    }

    if ($_.Query(this.element).length < 1) {
      throw new Error(`Element ${this.element} does not exsit.`);
    }

    options = defaultOption(options, {});

    if (checkIds(options.chapters)) {
      throw new Error('All ID\'s must be unqiue');
    }

    this.ytc = {};
    this.randomNumber = Math.floor(Math.random() * 99999);
    this.ytc.element = `youtube-iframe-${this.randomNumber}`;
    this.ytc.player = null;
    this.ytc.options = {
      youtubeId: defaultOption(options.youtubeId, 'bHQqvYy5KYo'),
      fluid: defaultOption(options.fluid, false),
      playerVars: defaultOption(options.playerVars, {}),
      height: defaultOption(options.height, '100%'),
      width: defaultOption(options.width, '100%'),
      showTime: defaultOption(options.showTime, false),
      chapters: sort(defaultOption(options.chapters, []))
    };

    this._init();
  }

  _init() {
    elements.push(this.element);
    this._buildStruture()
      ._addChapterPoints()
      ._addTextPoints()
      ._addYouTubeVideo();
  }

  _buildStruture() {
    const mainElement = $_.Query(this.element);

    mainElement
      .addElement('div', {
        'class': 'loading',
      }, 'Loading setup....')
      .addElement('div', {
        'class': 'youtube-chapter-wrapper',
      });

    mainElement
      .find('.youtube-chapter-wrapper')
      .addElement('div', {
        'class': 'youtube-wrapper',
        'style': `max-width: ${this.ytc.options.width}`
      })
      .addElement('div', {
        'class': 'chapters-wrapper'
      })
      .addElement('div', {
        'class': 'text-wrapper'
      })
      .find('.youtube-wrapper')
      .addElement('div', {
        'class': `youtube-video ${this.ytc.options.fluid ? 'fluid-wrapper' : ''}`,
        'id': `youtube-video-${this.randomNumber}`
      })
      .find('.youtube-video')
      .addElement('div', {
        'class': 'youtube-iframe',
        'id': this.ytc.element
      });

    mainElement
      .find('.chapters-wrapper')
      .addElement('ul', {
        'id': `chapters-wrapper-${this.randomNumber}`
      });

    mainElement
      .find('.text-wrapper')
      .addElement('ul', {
        'id': `text-wrapper-${this.randomNumber}`
      });

    return this;
  }

  _addChapterPoints() {

    const goToChatper = event => {
      event.preventDefault();
      this.seekTo(event.currentTarget.getAttribute('data-time'));
    };

    var chaptersWrapper = $_.Query(`#chapters-wrapper-${this.randomNumber}`);

    for (const current of this.ytc.options.chapters) {
      chaptersWrapper
        .addElement('li', {
          'class': 'chapter-point-wrapper',
          'id': `chapter-${current.id}-${this.randomNumber}`,
          'data-time': convertTime(current.time)
        })
        .find('li.chapter-point-wrapper')
        .addElement('div', {
          'class': 'chapter-point',
          'id': `chapter-point-${current.id}-${this.randomNumber}`
        }, current.title)
        .find('.chapter-point')
        .addElement('span', {
          'class': 'time'
        }, (this.ytc.options.showTime ? current.time : ''));
    }

    chaptersWrapper
      .find('li.chapter-point-wrapper')
      .addEvent('click', goToChatper);

    return this;
  }

  _addTextPoints() {
    var textWrapper = $_.Query(`#text-wrapper-${this.randomNumber}`);
    for (const current of this.ytc.options.chapters) {
      textWrapper
        .addElement('li', {
          'class': 'text-point',
          'id': `text-point-${current.id}-${this.randomNumber}`
        }, current.text);
    }

    return this;
  }

  _addYouTubeVideo() {

    if (window.YT && window.YT.Player) {

      this.playerSetup(this.ytc);

    } else {

      if (!window.onYouTubeIframeAPIReady) {

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubePlayerAPIReady = () => {
          for (const player of players) {
            player();
          }
        };

      }

      players.push(() => {
        this.playerSetup(this.ytc);
      });
    }

    return this;
  }

  complete() {
    const element = $_.Query(this.element);

    const iframeHeight = element
      .find(`#youtube-video-${this.randomNumber}`)
      .height();

    element
      .find('.chapters-wrapper')
      .height(iframeHeight);

    element
      .find('.youtube-chapter-wrapper')
      .addClass('complete');

    element
      .find('.loading')
      .remove();
  }


  playerSetup(params) {

    const onPlayerError = event => {
      const errormsg = event.data;
      if (errormsg === 150 || errormsg === 101) {
        window.alert('Error: An error has occurred');
      }
      event.target.stopVideo();
    }

    const onStateChange = event => {

      const chapters = $_.Query(`${this.element} .chapter-point-wrapper`);

      const playing = () => {
        chapters.each((index, element) => {
          const textPoint = $_.Query(`#${element.getAttribute('id').replace('chapter', 'text-point')}`);

          const time = parseFloat(element.getAttribute('data-time'));
          let next;

          if (chapters.element[index + 1]) {
            next = parseFloat(chapters.element[index + 1].getAttribute('data-time'));
          } else {
            next = this.ytc.player.getDuration();
          }

          element.classList.remove('current');
          textPoint.removeClass('current');

          if (this.ytc.player.getCurrentTime() > time && this.ytc.player.getCurrentTime() < next) {
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
    }

    params.player = new YT.Player(params.element, {
      height: params.options.height,
      width: params.options.width,
      videoId: params.options.youtubeId,
      playerVars: params.options.playerVars,
      events: {
        'onReady': () => {
          for (const callReady of onReady) {
            callReady();
          }
          onReady.length = 0;
          this.complete();
        },
        'onStateChange': onStateChange,
        'onError': onPlayerError
      }
    });
  }

  seek(time) {
    this.ytc.player.seekTo(time);
    this.ytc.player.playVideo();
  }

  seekTo(seekToTime) {

    seekToTime = parseFloat(convertTime(seekToTime));

    if (window.YT && window.YT.Player && onReady.length === 0) {
      this.seek(seekToTime);
    } else {
      onReady.push(() => {
        this.seek(seekToTime);
      });
    }

    return this;
  }

  goToChatperId(id) {

    const time = getTime(this.ytc.options.chapters, id);

    if (!time) {
      throw new Error(`No id with ${id} found.`);
    }

    const seekToTime = parseFloat(time);

    if (window.YT && window.YT.Player && onReady.length === 0) {
      this.seek(seekToTime);
    } else {
      onReady.push(() => {
        this.seek(seekToTime);
      });
    }

    return this;

  }

  pause() {

    if (window.YT && window.YT.Player && onReady.length === 0) {
      this.ytc.player.pauseVideo();
    } else {
      onReady.push(() => {
        this.ytc.player.pauseVideo();
      });
    }

    return this;
  }

  play() {

    if (window.YT && window.YT.Player && onReady.length === 0) {
      this.ytc.player.playVideo();
    } else {
      onReady.push(() => {
        this.ytc.player.playVideo();
      });
    }

    return this;
  }

  static setup(element, options) {
    return new YouTubeChapters(element, options);
  }

}
