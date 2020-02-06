"use strict";

module.exports = function(context) {
  if (!context.cloudevent) {
    throw "no event received in context";
  }
  console.log(context.cloudevent);
};
