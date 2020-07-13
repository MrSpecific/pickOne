/**
 * Function factory to allow an easy method to set a class on
 * only the desired elements of a set
 * @version 1.1.0
 * @type {Object}
 */

 /**
  * Config
  */
let config = {
  lastTarget: false,
  group: false,
  className: false,
  offClassName: false,
  invert: false,
}

/**
 * Dispatches custom events
 */
const fireEvent = (name, entry) => {
  const event = new CustomEvent(name, {
    bubbles: true,
    detail: entry,
  });

  entry.dispatchEvent(event);
};

/**
 * Test if a variable is iterable
 * @param  {*}  obj
 * @return {Boolean}
 */
function isIterable(obj) {
  if (obj == null) return false;

  return typeof obj[Symbol.iterator] === 'function';
}

/**
 * Accept a string, DOM element, or NodeList, and return an array of elements
 * @param  {*} elements
 * @return {Array}
 */
const collectElements = function(elements) {
  let collectedElements = [];

  if (typeof elements === 'string') {
    elements = document.querySelectorAll(elements);
  }

  if (isIterable(elements)) {
    collectedElements = Array.from(elements);
  } else if (elements instanceof Element || elements instanceof HTMLDocument) {
    collectedElements = [elements];
  }

  return collectedElements;
}

/**
 * Add a class to an element or set of elements
 */
const addClass = function(elements, className, offClassName = false) {
  const elementArray = collectElements(elements);

  elementArray.forEach((element) => {
    element.classList.add(className);

    if (offClassName) {
      element.classList.remove(offClassName);
    }

    fireEvent('classAdded', element);
  });
}

/**
 * Add an element to the group
 */
const addToGroup = function(elements) {
  const elementArray = collectElements(elements);

  elementArray.forEach((element) => {
    if (!this.config.group.includes(element)) {
      this.config.group.push(element);
    }
  });
}

/**
 * Set the group
 */
const setGroup = function(group) {
  this.config.group = collectElements(group);
}

/**
 * Remove the desired class from all elements of the group
 */
const removeClass = (elements, className, offClassName = false) => {
  if (!elements || !className) return false;

  const elementArray = collectElements(elements);

  elementArray.forEach((element) => {
    if (element.classList.contains(className)) {
      element.classList.remove(className);

      if (offClassName) {
        element.classList.add(offClassName);
      }

      fireEvent('classRemoved', element);
    }
  });
}

/**
 * Add the desired class to an element or elements
 */
const pick = function(target) {
  const targetElements = collectElements(target);

  // Short-circuit if no target is picked
  if (!targetElements || targetElements.length < 1) return false;

  // Remove class from the group
  if (this.config.group) {
    if (this.config.invert) {
      this.addClass(this.config.group, this.config.className, this.config.offClassName);
    } else {
      this.removeClass(this.config.group, this.config.className, this.config.offClassName);
    }
  }

  // Add class to the target(s)
  if (this.config.invert) {
    this.removeClass(targetElements, this.config.className, this.config.offClassName);
  } else {
    this.addClass(targetElements, this.config.className, this.config.offClassName);
  }

  this.config.lastTarget = targetElements;

  // Add target to the group, if not included
  this.addToGroup(this.config.lastTarget);
}

/**
 * Remove the class from a subset or all items
 */
const clear = function(target = false) {
  if (target) {
    target = collectElements(target);
    this.removeClass(target, this.config.className);
  } else {
    this.removeClass(this.config.group, this.config.className);
  }
}

/**
 * Initialize the object
 */
const init = function(options) {
  // Merge passed options with default configuration
  this.config = Object.assign({}, this.config, options);

  this.setGroup(this.config.group);

  return this;
};

/**
 * Function factory
 */
const pickOne = () => ({
  config,
  pick,
  init,
  addClass,
  removeClass,
  setGroup,
  addToGroup,
  clear,
});

export default pickOne;
