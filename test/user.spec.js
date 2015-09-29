'use strict';

var should = require('should'),
	expect = require('expect.js'),
	request = require('supertest');

var url = 'http://localhost:3001/api';

describe('User', function () {

	var fakeUser = {
		email: 'supertest',
		password: 'supertest',
		first_name: 'Supertest',
		last_name: 'Mocha',
		birthday: new Date('2012/11/14').toISOString(),
		gender: 'male'
	};


	it('should return an HTTP status [422] (Unprocessable Entity) when an user try to create an account with invalid informations.', function (done) {

		var signUpUser = fakeUser;

		request(url)
			.post('/signup')
			.send(signUpUser)
			.expect(422)
			.end(function (err, res) {
				if (err) throw err;

				var response = res.body;

				expect(response.message).to.equal('User validation failed');
				expect(response.errors.password.message).to.equal('Please fill a password with letters and numbers');
				expect(response.errors.email.message).to.equal('Please fill a valid email address');

				done();
			});
	});

	it('should return an HTTP status [201] (Created) when an user was created.', function (done) {

		fakeUser.email += '@mocha.com';
		fakeUser.password += '123';

		var signUpUser = fakeUser;

		request(url)
			.post('/signup')
			.send(signUpUser)
			.expect('Content-Type', /json/)
			.expect(201)
			.end(done);
	});

	it('should return an HTTP status [409] (Conflit) when user try to create an account with an email has already in use.', function (done) {

		var signUpUser = fakeUser;

		request(url)
			.post('/signup')
			.send(signUpUser)
			.expect('Content-Type', /json/)
			.expect(409)
			.expect({message: 'Email has already in use.'})
			.end(done);
	});

	it('should return an HTTP status [200] (Ok) and a message when an user was logged.', function (done) {

		var credentidals = {
			email: fakeUser.email,
			password: fakeUser.password
		};

		request(url)
			.post('/signin')
			.send(credentidals)
			.expect(200)
			.end(function (err, res) {
				if (err) throw err;

				fakeUser.token = res.body.token;
				fakeUser.id = res.body.user.id;

				done();
			});
	});

	it('should return an HTTP status [200] (Ok) when an user was deleted.', function (done) {

		request(url)
			.del('/user/' + fakeUser.id)
			.send({'token': fakeUser.token})
			.end(done);
	});
});
