'use strict';

const runtime = require('..');
const test = require('tape');
const request = require('supertest');

// test('Loads a user function with dependencies', t => {
//   framework(func, server => {
//     t.plan(2);
//     request(server)
//       .get('/')
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         t.error(err, 'No error');
//         t.equal(res.body, 'This is the test function for Node.js FaaS. Success.');
//         t.end();
//         server.close();
//       });
//     }, { log: false });
// });

// test('Can respond via an async function', t => {
//   framework(func, server => {
//     t.plan(2);
//     request(server)
//       .get('/')
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         t.error(err, 'No error');
//         t.equal(res.body,
//           'This is the test function for Node.js FaaS. Success.');
//         t.end();
//         server.close();
//       });
//     }, { log: false });
// });
const server = 'http://localhost:8080';

test('Exposes readiness URL', t => {
  t.plan(2);
  request(server)
    .get('/health/readiness')
    .expect(200)
    .expect('Content-type', /text/)
    .end((err, res) => {
      t.error(err, 'No error');
      t.equal(res.text, 'OK');
      t.end();
    });
});

test('Exposes liveness URL', t => {
  t.plan(2);
  request(server)
    .get('/health/liveness')
    .expect(200)
    .expect('Content-type', /text/)
    .end((err, res) => {
      t.error(err, 'No error');
      t.equal(res.text, 'OK');
      t.end();
    });
});

test.onFinish(runtime.close);
