## my own implementation of a JSFuck-compiler

inspired by, but not copied from:
- [github.com/aemkei/jsfuck](https://github.com/aemkei/jsfuck)
- [github.com/lowbyteproductions/JavaScript-Is-Weird](https://github.com/lowbyteproductions/JavaScript-Is-Weird)

## what is JSFuck?

It's Javascript, but written only with a **very** samll subset of characters, most commonly `!+()[]`\
(see: [esolangs.org/wiki/JSFuck](https://esolangs.org/wiki/JSFuck))

## how can I compile my code?

Features like commandline-arguments are still missing from the compiler. Currently, at the end of `compiler.js` a [Hello, world!](https://esolangs.org/wiki/Hello,_world!)-program is coompiled and run, just change it to your code for the time beeing.

## future plans for the compiler

- reading/writing code from/to files (commandline-arguments)
- including a minimizer (for the original js-code)
