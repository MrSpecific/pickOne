# pickOne
A tiny ES6+ utility to easily apply a class on one item (or more) of a set, and remove it from the others.

> NOTE: Named pickOneItem on NPM to avoid existing package names

## :floppy_disk: Development Team
- [Will Christenson](https://github.com/MrSpecific) (Egalitarian Project Lead :unicorn:)

## :wrench: Setup & Usage
Simply drop-in and import the module into your code
```
import pickOne from './pickoneitem';
```

Then, create your **pickOne** set and initialize it with an options object
```
const testGroup = pickOne();

testGroup.init({
  className: 'test',
  group: '.test-group',
});
```

You can pass either a selector as a string (**pickOne** will use `querySelectorAll()`) or a DOM element / NodeList for `group`.

Once initialized, the pickOne instance is ready to be used.
To "pick" an element or elements, simply call:
```
testGroup.pick(element);
```
Again, you can use a DOM Element, a NodeList or a string with a selector to specify your chosen element(s). The designated class will be added to those elements, and removed from the rest of the group.

> Note: **pickOne** will fire a custom `classAdded` event on all picked elements as well as a `classRemoved` event on any that had the class removed.

> Note: If you pick elements that are not currently in the group, **pickOne** will automatically add them (Katamari Damacy style).

**pickOne** is agnostic of usage, so you'll need to set up your own event listeners / functionality to trigger changes.

### Additional Config Options
You can optionally pass these config options on init (or later):
- `invert: [boolean]` - When set to `true`, **pickOne** will do the __inverse__ of normal behavior. Eg., it will remove the selected class from the __picked__ element, and *add* it to the rest of the group.
- `offClassName: [string]` - This is an additional class, which will be applied whenever the primary class has been removed from an element.

### Additional Methods
- `pickOne.setGroup()` - Set a new group for the **pickOne** instance. Useful if something else has manipulated the DOM.
- `pickOne.addClass()` - Add the class to one or more elements (without removing it from any others)
- `pickOne.clear()` - Remove the class from all elements in the group, or pass a selector / element(s) to remove from only those items.
- `pickOne.addToGroup()` - Add elements to the group (also useful when the DOM is manipulated)
