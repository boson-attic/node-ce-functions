'use strict';

module.exports = function (context) {
  return {
    message: `Hello from Cloud Events!`,
    receivedEvent: context.cloudevent
  };
}
