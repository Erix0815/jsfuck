## my own implementation of a JSFuck-compiler

inspired by, but not copied from:
- [github.com/aemkei/jsfuck](https://github.com/aemkei/jsfuck)
- [github.com/lowbyteproductions/JavaScript-Is-Weird](https://github.com/lowbyteproductions/JavaScript-Is-Weird)

## what is JSFuck?

It's Javascript, but written only with a **very** samll subset of characters, most commonly `!+()[]`\
(see: [esolangs.org/wiki/JSFuck](https://esolangs.org/wiki/JSFuck))

## how can I compile my code?

put yor code in `test.js` and run `make`\
alternatively:
```bash
node compiler.js file1.js file2.js ...
```
will read your code from `file1.js` and save the compiled code to `file1.jsfuck` and so on

## possible future features for the compiler (if i feel like it)

- compilling multiple files to one\
  (better commandline-args, like `-o`)
- including a minimizer (for the original js-code)
