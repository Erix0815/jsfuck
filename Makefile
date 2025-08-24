test.jsfuck: test.js
	node compiler.js test.js

test: test.jsfuck
	node test.jsfuck
