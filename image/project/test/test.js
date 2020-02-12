'use strict';

const test = require('tape');
const request = require('supertest');

const runtime = require('..');

const Spec = {
  version: 'ce-specversion',
  type: 'ce-type',
  id: 'ce-id',
  source: 'ce-source'
};

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

test('Handles a valid event', t => {
  t.plan(2);
  request(server)
    .post('/')
    .send({ message: 'hello' })
    .set(Spec.id, 'TEST-EVENT-1')
    .set(Spec.source, 'http://localhost:8080/integration-test')
    .set(Spec.type, 'dev.faas.example')
    .set(Spec.version, '1.0')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.error(err, 'No error');
      t.equal(res.body.data.message, 'hello');
      t.end();
    });
});

test.onFinish(runtime.close);
