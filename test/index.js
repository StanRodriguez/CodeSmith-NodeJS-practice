const request = require('supertest')('http://localhost:3000');
const server = require('./../server/server');

describe('Your server', () => {
  it('should respond to GET request for \'/\' with 200', (done) => {
    request
      .get('/')
      .expect(200, done);
  });

  it('should respond to GET request for \'/\' with text/html', (done) => {
    request
      .get('/')
      .set('Accept','text/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  it('should respond to GET requests for \'/wrong.html\' with 404', (done) => {
    request
      .get('/wrong.html')
      .expect(404, done)
  });

  it('should respond to POST requests for \'/sayHi\' with 200', (done) => {
    request
      .post('/sayHi')
      .set('Accept','text/*')
      .expect(200, done)
  });

  it('should respond to POST requests for \'/sayHi\' with "hi back to you!"', (done) => {
    request
      .post('/sayHi')
      .set('Accept','text/*')
      .expect('hi back to you!', done)
  });

  it('should respond to POST requests for \'/greeting\' with body "hello" with 200', (done) => {
    request
      .post('/greeting')
      .send('hello')
      .set('Accept','text/*')
      .expect(200, done)
  });

  it('should respond to POST requests for \'/greeting\' with body "hello" with "hello there!"', (done) => {
    request
      .post('/greeting')
      .send('hello')
      .set('Accept','text/*')
      .expect('hello there!', done)
  });

  it('should respond to POST requests for \'/greeting\' with body "what\'s up" with 200', (done) => {
    request
      .post('/greeting')
      .send('what\'s up')
      .set('Accept','text/*')
      .expect(200, done)
  });

  it('should respond to POST requests for \'/greeting\' with body "what\'s up" with "the sky"', (done) => {
    request
      .post('/greeting')
      .send('what\'s up')
      .set('Accept','text/*')
      .expect('the sky', done)
  });

  it('should respond to POST requests for \'/greeting\' with another body with 200', (done) => {
    request
      .post('/greeting')
      .send('yo')
      .set('Accept','text/*')
      .expect(200, done)
  });

  it('should respond to POST requests for \'/greeting\' with another body with "good morning"', (done) => {
    request
      .post('/greeting')
      .send('yo')
      .set('Accept','text/*')
      .expect('good morning', done)
  });

  it('should respond to POST requests for \'/nothing\' with 404', (done) => {
    request
      .post('/nothing')
      .set('Accept','text/html')
      .expect(404,done);
  });

  it('should respond to GET requests for \'/style.css\' with 200', (done) => {
    request
      .get('/style.css')
      .expect(200, done);
  });

  it('should respond to GET requests for \'/style.css\' with text/css', (done) => {
    request
      .get('/style.css')
      .set('Accept', 'text/css')
      .expect('Content-Type', /css/)
      .expect(200, done);
  });

  after(() => {
    server.close();
  })

});
