
module.exports = function (context) {
  return {
    message: `Hello from Cloud Events!`,
    event: context.cloudevent
  };
}
