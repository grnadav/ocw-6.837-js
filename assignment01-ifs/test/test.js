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
			'../test/js/vec2.spec.js'
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