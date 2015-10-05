'use strict';

function call_test(name, path) {
	describe(name, function() {
		require(path);	
	});
}

describe("RESTFul", function() {
	
	beaforeEach(function() {
		console.log('running something before each test...');
	});
	
	call_test("User", './user.spec');
		
});