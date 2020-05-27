# pickOne
A tiny ES6+ utility to easily apply a class on only one item of a set (at a time).

## :floppy_disk: Development Team
- [Will Christenson](https://github.com/MrSpecific) (Egalitarian Project Lead :unicorn:)

## :wrench: Setup & Usage
Simply drop-in and import the module into your code
```
import pickOne from './pickOne';
```

Then, create your **pickOne** set and initialize it with an options object
```
const testGroup = pickOne();

testGroup.init({
  className: 'test',
  group: '.test-group',
});
```

You can pass either a selector as a string (**pickOne** will use `querySelectorAll()`) or a DOM element / Nodelist for `group`.

Once initialized, the pickOne instance is ready to be used.
To "pick" an element or elements, simply call:
```
testGroup.pick(element);
```
Again, you can use a DOM Element, a Nodelist or a string with a selector to specify your chosen element(s). The designated class will be added to those elements, and removed from the rest of the group.

> Note: **pickOne** will fire a custom `classAdded` event on all picked elements as well as a `classRemoved` event on any that had the class removed.

> Note: If you pick elements that are not currently in the group, **pickOne** will automatically add them (Katamari Damacy style).

**pickOne** is agnostic of usage, so you'll need to set up your own event listeners / functionality to trigger changes.
