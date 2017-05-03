/**
 * Main Q class
 *
 * @class Q
 * @example
 * let query = Q('elementID');
 */
class Q {

  /**
   * Main constructor for Q class
   * @constructor
   * @param {string} element - A DOM element to wrap in a Q object.
   */
  constructor(element) {
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
        const nodes = document.querySelectorAll(element);
        for (let i = 0; i < nodes.length; i += 1) {
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
  addElement(tag, object, text) {
    const crEl = document.createElement(tag);
    if (object) {
      new Q(crEl).attr(object);
    }
    if (text) {
      crEl.innerHTML = text;
    }
    if (this.element.length) {
      for (let i = 0; i < this.element.length; i += 1) {
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
  find(element) {
    const results = [];
    for (let i = 0; i < this.length; i += 1) {
      const current = this.element[i].querySelectorAll(element);
      if (current) {
        for (let j = 0; j < current.length; j += 1) {
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
  addEvent(eventName, eventHandler) {
    for (let i = 0; i < this.length; i += 1) {
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
  each(callback) {
    let end;
    for (let i = 0; i < this.length; i += 1) {
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
  addClass(className) {
    if (this.element.length > 0) {
      for (let i = 0; i < this.element.length; i += 1) {
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
  removeClass(className) {
    if (this.element.length > 0) {
      for (let i = 0; i < this.element.length; i += 1) {
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
  height(height) {
    if (height) {
      for (let i = 0; i < this.element.length; i += 1) {
        this.element[i].style.height = `${height}px`;
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
  width(width) {
    if (width) {
      for (let i = 0; i < this.element.length; i += 1) {
        this.element[i].style.width = `${width}px`;
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
  attr(attr) {
    if (typeof attr === 'string') {
      return this.element[0].getAttribute(attr);
    }

    Object.keys(attr).forEach((key) => {
      for (let i = 0; i < this.element.length; i += 1) {
        if (key.indexOf('data') > -1) {
          this.element[i].dataset[key.toLowerCase().replace('data', '')] = attr[key];
        } else {
          this.element[i].setAttribute(key, attr[key]);
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
  remove() {
    for (let i = 0; i < this.element.length; i += 1) {
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
  next() {
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
  isEmpty() {
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
  parent() {
    return new Q(this.element[0].parentNode);
  }

  /**
   * Returns new Q.
   * @param {string} element - A DOM element to wrap in a Q object.
   * @private
   * @returns {Q} New Q class.
   */
  static findSelector(element) {
    return new Q(element);
  }
}

export default Q.findSelector;
