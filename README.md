# pickOne
A tiny ES6+ utility to easily apply a class on only one item of a set (at a time).

## :floppy_disk: Development Team
- [Will Christenson](https://github.com/MrSpecific) (Egalitarian Project Lead :unicorn:)

## Usage
Simply drop-in and import the module into your code
```
import pickOne from './pickOne';
```

Then, create your pickOne set and initialize it with an options object
```
const testPick = pickOne();

testPick.init({
  className: 'test',
  group: '.test-group',
});
```
