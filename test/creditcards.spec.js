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

	it('should return a found credit card using an id.', function(done) {

		request(url)
			.get('/user/' + user_id + '/creditcards/' + fakeCreditCard.id)
			.set('token', token)
			.expect(200)
			.end(function(err, res) {
				if (err) throw err;

				var response = res.body;

				expect(response.success).to.equal(true);
				expect(response.data._id).to.equal(fakeCreditCard.id);

				done();
			});
	});

	it('should return a list with all credit cards associated to an user.', function(done) {

		request(url)
			.get('/user/' + user_id + '/creditcards')
			.set('token', token)
			.expect(200)
			.end(function(err, res) {
				if (err) throw err;

				var response = res.body;

				expect(response.success).to.equal(true);
				expect(response.list).to.be.an('array');

				done();
			});
	});

	it('should update and return a sent credit card. ', function(done) {

		var ufakeCreditCard = {
			description: 'Visa 4435',
			buy_day: 10,
			payment_day: 15,
			valid_thru: '06/19'
		};

		request(url)
			.put('/user/' + user_id + '/creditcards/' + fakeCreditCard.id)
			.set('token', token)
			.send(ufakeCreditCard)
			.expect(200)
			.end(function(err, res) {
				if (err) throw err;

				var response = res.body;

				expect(response.nModified).to.equal(1);
			});

		request(url)
			.get('/user/' + user_id + '/creditcards/' + fakeCreditCard.id)
			.set('token', token)
			.expect(200)
			.end(function(err, res) {
				if (err) throw err;

				var response = res.body;

				expect(response.success).to.equal(true);
				expect(response.data._id).to.equal(fakeCreditCard.id);
				expect(response.data.description).to.equal(ufakeCreditCard.description);
				expect(response.data.payment_day).to.equal(ufakeCreditCard.payment_day);
				expect(response.data.valid_thru).to.equal(ufakeCreditCard.valid_thru);
				expect(response.data.buy_day).to.equal(ufakeCreditCard.buy_day);

				done();
			});
	});

	it('should return Ok when credit card will be deleted.', function (done) {

		request(url)
			.del('/user/' + user_id + '/creditcards/' + fakeCreditCard.id)
			.set('token', token)
			.expect(200)
			.end(done);		
	});

	it('shouldn\'t return an credit card that was deleted.', function (done) {
		
		request(url)
			.get('/user/' + user_id + '/creditcards/' + fakeCreditCard.id)
			.set('token', token)
			.expect(404)
			.end(done);
	});

	after(function (done) {
		request(url)
			.del('/user/' + user_id)
			.set('token', token)
			.end(done);
	});
});
