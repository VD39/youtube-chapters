//jQuery clone to suit purpose of element building
class Q {

  constructor(element) {
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

  addElement(tag, object, text) {
    const crEl = document.createElement(tag);
    if (object) {
      this.attr(object, crEl);
    }
    if (text) {
      crEl.innerHTML = text;
    }
    if (this.element.length) {
      for (let i = 0; i < this.element.length; i++) {
        this.element[i].appendChild(crEl);
      }
    } else {
      this.element.appendChild(crEl);
    }
    return this;
  }

  find(element) {
    var results = [];
    for (let i = 0; i < this.length; i++) {
      const current = this.element[i].querySelectorAll(element);
      if (current) {
        for (let j = 0; j < current.length; j++) {
          results.push(current[j]);
        }
      }
    }
    return new Q(results);
  }

  addEvent(eventName, eventHandler) {
    for (let i = 0; i < this.length; i++) {
      this.element[i].addEventListener(eventName, eventHandler, false);
    }
    return this;
  }

  each(callback) {
    let end;
    for (let i = 0; i < this.length; i++) {
      end = callback.call(this.element[i], i, this.element[i]);
      if (end === false) {
        break;
      }
    }
    return this;
  }

  addClass(className) {
    if (this.element.length > 0) {
      for (let i = 0; i < this.element.length; i++) {
        this.element[i].classList.add(className);
      }
    }
    return this;
  }

  removeClass(className) {
    if (this.element.length > 0) {
      for (let i = 0; i < this.element.length; i++) {
        this.element[i].classList.remove(className);
      }
    }
    return this;
  }

  height(height) {
    if (height) {
      for (let i = 0; i < this.element.length; i++) {
        this.element[i].style.height = `${height}px`;
      }
    } else {
      return this.element[0].clientHeight;
    }
    return this;
  }

  attr(attr, _element) {
    if (typeof attr === 'string') {
      return this.element[0].getAttribute(attr);
    }
    for (const key in attr) {
      if (attr.hasOwnProperty(key)) {
        if (_element) {
          _element.setAttribute(key, attr[key]);
        } else {
          for (let i = 0; i < this.element.length; i++) {
            this.element[i].setAttribute(key, attr[key]);
          }
        }
      }
    }
    return this;
  }

  remove() {
    for (let i = 0; i < this.element.length; i++) {
      this.element[i].parentNode.removeChild(this.element[i]);
    }
  }

  isEmpty() {
    return this.element[0].innerHTML.trim() === "";
  }


  static findSelector(element) {
    return new Q(element);
  }
}

export default Q.findSelector;
