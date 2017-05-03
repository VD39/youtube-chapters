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
  const ids = chapters.map(item => item.id);
  return ids.some((item, idx) => ids.indexOf(item) !== idx);
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

  for (let i = 0; i < chapters.length; i += 1) {
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
  return /^\d+$/.test(value);
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

  let match = duration.replace(/ /g, '').match(/(\d+h)?(\d+m)?(\d+s)?/);

  if (match[0]) {
    return ((parseInt(match[1], 10) || 0) * 3600) +
      ((parseInt(match[2], 10) || 0) * 60) +
      (parseInt(match[3], 10) || 0);
  }

  match = duration.split(':');

  if (match.length > 2) {
    return (parseInt(match[0], 10) * 3600) +
      (parseInt(match[1], 10) * 60) +
      (parseInt(match[2], 10) * 1);
  }

  return (parseInt(match[0], 10) * 60) + (parseInt(match[1], 10) * 1);
}

/**
 * Sorts the array by time.
 * @param {array} array - The array to sort by time.
 * @private
 * @returns {array} The orginal array sorted.
 */
function sort(array) {
  return array.sort((a, b) => convertTime(a.time) - convertTime(b.time));
}

/**
 * Returns the default loading HTML.
 * @private
 * @returns {string} The default HTML for the loading.
 */
function loader() {
  return '<div class="loading-wrapper">' +
    '<p class="loading-text">Loading YouTube Video</p>' +
    '</div>';
}

export { defaultOption, checkIds, getTime, convertTime, sort, loader };
