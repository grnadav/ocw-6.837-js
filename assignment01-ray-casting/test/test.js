require.config({
	baseUrl: '../src/js'
});

// mocha init
mocha.ui('bdd');
mocha.ignoreLeaks(true);
mocha.reporter('html');
// set global test mode to true - needs to happen before the require of the modules
window.__TESTS__ = true;

/**
	Require tests to run
*/
require(
		[
            '../test/js/vec2.spec.js',
            '../test/js/vec3.spec.js',
            '../test/js/vec4.spec.js',
            '../test/js/vectors.spec.js',
            '../test/js/matrix.spec.js',
            '../test/js/sphere.spec.js'
		],
		function () {
            if (window.mochaPhantomJS) {
                mochaPhantomJS.run();
            }
            else {
                mocha.run();
            }
		}   
		
);