'use strict';

var chai 	= require("chai"),
	should 	= chai.should;
chai.use(require('chai-things'));

var	expect 	= chai.expect,
	request = require('supertest');


var url = 'http://monificando.dev/api';

describe('TAGS ---------------| ', function() {

	var fake_user = {
		email: 'supertest@mocha.com',
		password: 'supertest123',
		first_name: 'Supertest',
		last_name: 'Mocha',
		birthday: new Date('2012/11/14').toISOString(),
		gender: 'male'
	};

	var fake_TAG = {
		description: 'Cursos'
	};

	before(function(done) {

		request(url)
			.post('/signup')
			.send(fake_user)
			.end(function(err, res) {
				if (err) throw err;

				request(url)
					.post('/signin')
					.send({
						email: fake_user.email,
						password: fake_user.password
					})
					.expect(200)
					.end(function (err, res) {
						if (err) throw err;

						var response = res.body;

						fake_user.token = response.token;
						fake_user.id = response.user._id;

						done();
					});
			});
	});

	it('[POST]: should return an variable with followed key:value (success:true) when TAG will be created.', function(done) {

		request(url)
			.post('/user/' + fake_user.id + '/tags')
			.set('token', fake_user.token)
			.send(fake_TAG)
			.expect(201)
			.expect({ success: true })
			.end(function(err, res) {

				request(url)
					.post('/user/' + fake_user.id + '/tags')
					.set('token', fake_user.token)
					.send(fake_TAG)
					.expect(201)
					.expect({ success: true })
					.end(done);				
			});
	});

	it('[LIST]: should return a list of TAGs passing the user\'s id.', function(done) {

		request(url)
			.get('/user/' + fake_user.id + '/tags')
			.set('token', fake_user.token)
			.expect(200)
			.end(function(err, res) {
				if (err) throw err;

				var response = res.body;

				expect(response.success).to.equal(true);
				expect(response.list[0].description).to.equal(fake_TAG.description);

				fake_TAG.id = response.list[0]._id;

				done();
			});
	});

	// TODO Busca por nome da TAG
	/*it('[GET]: should return a created TAG passing the user\'s id and TAG\'s id.', function(done) {
		console.log('Request URI:', '/user/' + fake_user.id + '/tags/' + fake_TAG.id);
		request(url)
			.get('/user/' + fake_user.id + '/tags/' + fake_TAG.id)
			.set('token', fake_user.token)
			.expect(200)
			.end(function(err, res) {
				if (err) throw err;

				var response = res.body;

				console.log('response: ', response);

				expect(response.success).to.equal(true);
				expect(response.data.description).to.equal(fake_TAG.description);

				done();
			});
	});*/
	
	it('[PUT]: should return a updated TAG after send new update.', function(done) {
		
		var ufake_TAG = {
			description: 'Alimentação'
		};

	    request(url)
	    	.put('/user/' + fake_user.id + '/tags/' + fake_TAG.id)
	    	.set('token', fake_user.token)
	    	.send(ufake_TAG)
	    	.expect(200)
	    	.end(function(err, res) {
	    		if (err) throw err;
	    		
	    		var response = res.body;
	    		
	    		expect(response.success).to.equal(true);
	    		expect(response.data.description).to.equal(ufake_TAG.description);
	    		
	    		done();
	    	});
	});
	
	/*it('[DELETE]: should return an variable with followed key:value (deleted:true) when TAG will be deleted.', function(done) {
		
		request(url)
			.del('/user/' + fake_user.id + '/tags/' + fake_TAG.id)
			.set('token', fake_user.token)
			.send({ '_id': fake_user.id })
			.expect(200)
			.end(function(err, res) {
				if (err) throw err;
				
				var response = res.body;
				
				expect(response.deleted).to.equal(true);
				
				done();	
			});
	});*/
	

	after(function(done) {

		request(url)
			.del('/user/' + fake_user.id)
			.set('token', fake_user.token)
			.send({ '_id': fake_user.id })
			.end(done);
	});
});
