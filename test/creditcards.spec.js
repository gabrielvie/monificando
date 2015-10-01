'use strict';

var should = require('should'),
	expect = require('expect.js'),
	request = require('supertest');

var url = 'http://monificando.dev/api';

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
			.end(function(err, res) {
				if (err) throw err;

				var response = res.body;

				expect(response.success).to.equal(true);
				expect(response.data.description).to.equal(fakeCreditCard.description);
				expect(response.data.payment_day).to.equal(fakeCreditCard.payment_day);
				expect(response.data.valid_thru).to.equal(fakeCreditCard.valid_thru);
				expect(response.data.buy_day).to.equal(fakeCreditCard.buy_day);

				fakeCreditCard.id = response.data._id;

				done();
			});
	});

	it('should return a created credit card using id.', function(done){

		request(url)
			.get('/user/' + user_id + '/creditcards/' + fakeCreditCard.id)
			.set('token', token)
			.expect(200)
			.end(function(err, res){
				if (err) throw err;

				var response = res.body;

				expect(response.success).to.equal(true);
				expect(response.data._id).to.equal(fakeCreditCard.id);

				done();
			});
	});

	after(function (done) {
		request(url)
			.del('/user/' + user_id)
			.set('token', token)
			.end(done);
	});
});
