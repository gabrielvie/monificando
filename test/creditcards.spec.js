'use strict';

var should = require('should'),
	expect = require('expect.js'),
	request = require('supertest');

var url = 'http://localhost:3001/api';

describe('Credit Card', function () {

	var token = null,
		user_id = null;

	before(function (done) {
		request(url)
			.post('/signup')
			.send({
				email: 'supertest@mocha.com',
				password: 'supertest123',
				first_name: 'Supertest',
				last_name: 'Mocha',
				birthday: new Date('2012/11/14').toISOString(),
				gender: 'male'
			})
			.expect(201)
			.end(done);
	});

	beforeEach(function (done) {
		request(url)
			.post('/signin')
			.send({
				email: 'supertest@mocha.com',
				password: 'supertest123'
			})
			.end(function (err, res) {
				if (err) throw err;

				token = res.body.token;
				user_id = res.body.user.id;

				done()
			});
	});

	var fakeCreditCard = {
		description: 'Master 1546',
		payment_day: 15,
		buy_day: 27,
		valid_thru: '06/15'
	};

	it('should return a message \'success:true\' when the user save a new credit card.', function (done) {

		request(url)
			.post('/user/' + user_id + '/creditcards')
			.set('token', token)
			.send(fakeCreditCard)
			.expect(201)
			.expect({success: true})
			.end(done);
	});

	after(function (done) {
		request(url)
			.del('/user/' + user_id)
			.set('token', token)
			.end(done);
	});
});
