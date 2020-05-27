/**
 * Function factory to allow an easy method to set a class on
 * only the desired elements of a set
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
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
function isIterable(obj) {
  if (obj == null) return false;

  return typeof obj[Symbol.iterator] === 'function';
}

/**
 * Remove the desired class from all elements of the group
 */
const removeClass = function(group, className) {
  if (!group || !className) return false;

  Array.from(group).forEach((element) => {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
      fireEvent('wasNotPicked', element);
    }
  });
}

/**
 * Add the desired class to an element or elements
 */
const pick = function(target) {
  if (!this.config.group || !target) return false;

  if (typeof target === 'string') {
    target = document.querySelectorAll(target);
  }
  if (isIterable(target)) {
    this.config.lastTarget = Array.from(target);
  } else {
    this.config.lastTarget = [target];
  }

  removeClass(this.config.group, this.config.className);

  this.config.lastTarget.forEach((element) => {
    element.classList.add(this.config.className);
    fireEvent('wasPicked', element);
  });
}

/**
 * Initialize the object
 */
const init = function(options) {
  // If selector passed, collect the matched elements
  if (typeof options.group === 'string') {
    options.group = document.querySelectorAll(options.group);
  }

  // Convert group to an array
  options.group = Array.from(options.group);

  // Merge passed options with default configuration
  this.config = Object.assign({}, this.config, options);

  return this;
};

/**
 * Function factory
 */
const pickOne = () => ({
  config,
  pick,
  init,
});

export default pickOne;
