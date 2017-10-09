// Just a helper function for logging to the console with a timestamp.
module.exports = {
  info: function(msg) {
    console.log(formatMessage(msg))
  },
  warn: function(msg) {
    console.warn(formatMessage(msg))
  }
};

currentTime = function() {
  return (`[${new Date().toLocaleTimeString()}]`)
}

formatMessage = function(msg) {
  return (`${currentTime()} ${msg}`);
}
