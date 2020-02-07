'use strict';

const func = require('..');
const test = require('tape');
const cloudevents = require('cloudevents-sdk/v1');

// Ensure the function throws an error if there is no event in the
// provided context.
test('Throws error on empty context', t => {
  t.plan(1);
  t.throws(function() {
    func({}); // Invoke with an empty context.
  });
});

// Ensure that the function completes cleanly when passed a valid event.
test('Handles a valid event', t => {
  // A valid event includes id, type and source at a minimum.
  let e = cloudevents.event();
  e.id('TEST-EVENT-01');
  e.type('com.example.cloudevents.test');
  e.source('http://localhost:8080/');

  // Invoke the function with the valid event, which should compelte without error.
  func({ cloudevent: e });
  t.end();
});
