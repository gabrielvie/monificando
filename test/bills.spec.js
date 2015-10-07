'use strict';

var chai 	= require("chai"),
	should 	= chai.should;
chai.use(require('chai-things'));

var	expect 	= chai.expect,
	request = require('supertest');


var url = 'http://monificando.dev/api';

describe('BILLS --------------| ', function() {

	var fake_user = {
		email: 'supertest@mocha.com',
		password: 'supertest123',
		first_name: 'Supertest',
		last_name: 'Mocha',
		birthday: new Date('2012/11/14').toISOString(),
		gender: 'male'
	};

	var fake_bill = {
		description: 'Conta de Luz',
		total: 123.68,
		payment_options: 'money',
		repeat: 'no_repeat'
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

	it('[POST]: should return an variable with followed key:value (success:true) when BILL will be created.', function(done) {

		request(url)
			.post('/user/' + fake_user.id + '/bills')
			.set('token', fake_user.token)
			.send(fake_bill)
			.expect(201)
			.end(function(err, res){
				if (err) throw err;

				res.body.success.should.be.true;

				done();
			});
	});

	it('[LIST]: should return a list of BILLs passing the user\'s id.', function(done) {

		request(url)
			.get('/user/' + fake_user.id + '/bills')
			.set('token', fake_user.token)
			.expect(200)
			.end(function(err, res) {
				if (err) throw err;

				var response = res.body;

				response.success.should.be.true;
				response.list.should.be.an.array;
				response.list[0].should.containEql({ description: fake_bill.description });
				fake_bill.id = response.list[0]._id;

				done();
			});
	});

	it('[GET]: should return a created BILL passing the user\'s id and BILL\'s id.', function(done) {

		request(url)
			.get('/user/' + fake_user.id + '/bills/' + fake_bill.id)
			.set('token', fake_user.token)
			.expect(200)
			.end(function(err, res) {
				if (err) throw err;

				var response = res.body;

				response.success.should.be.true;
				response.data.description.should.equal(fake_bill.description);

				done();
			});
	});
	
	it('[PUT]: should return a updated BILL after send new update.', function(done) {
		
		var ufake_bill = {
			description: 'Conta de Agua',
			total: 245.65
		};

	    request(url)
	    	.put('/user/' + fake_user.id + '/bills/' + fake_bill.id)
	    	.set('token', fake_user.token)
	    	.send(ufake_bill)
	    	.expect(200)
	    	.end(function(err, res) {
	    		if (err) throw err;
	    		
	    		var response = res.body;
	    		
	    		response.success.should.be.true;
	    		response.data.description.should.be.equal(ufake_bill.description);
	    		
	    		done();
	    	});
	});
	
	it('[DELETE]: should return an variable with followed key:value (deleted:true) when BILL will be deleted.', function(done) {
		
		request(url)
			.del('/user/' + fake_user.id + '/bills/' + fake_bill.id)
			.set('token', fake_user.token)
			.send({ '_id': fake_user.id })
			.expect(200)
			.end(function(err, res) {
				if (err) throw err;
				
				var response = res.body;
				
				response.deleted.should.be.true;
				
				done();	
			});
	});
	

	after(function(done) {

		request(url)
			.del('/user/' + fake_user.id)
			.set('token', fake_user.token)
			.send({ '_id': fake_user.id })
			.end(done);
	});
});
