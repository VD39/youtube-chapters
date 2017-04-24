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
  const ids = chapters.map(item => item.id);
  return ids.some((item, idx) => ids.indexOf(item) !== idx);
}

function getTime(chapters, id) {
  if (!chapters) {
    return false;
  }

  for (const chapter of chapters) {
    if (chapter.id === id) {
      return convertTime(chapter.time);
    }
  }

  return null;
}

function _isNumber(value) {
  return /^\d+$/.test(value);
}

function convertTime(duration) {

  if (_isNumber(duration)) {
    return duration;
  }

  let match = duration.replace(/ /g, '').match(/(\d+h)?(\d+m)?(\d+s)?/);
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

export { defaultOption, checkIds, getTime, convertTime, sort };