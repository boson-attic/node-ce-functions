'use strict';

module.exports = function (context) {
  if (!context.cloudevent) {
    return new Error('No cloud event received');
  }
  context.log.info(`Cloud event received: ${context.cloudevent}`);
  return {
    data: context.cloudevent.data
  }
};
