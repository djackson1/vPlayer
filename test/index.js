var should = require('chai').should(),
	vplayer = require('../index'),
	consoleLogFunc = vplayer.consoleLog;

describe('#consoleLog', function(){
	it('displays a message in the console', function(){
        consoleLogFunc('console message').should.equal(true);
	});
});

//Old tests