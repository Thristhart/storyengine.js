var storyengine = storyengine || {};

storyengine.Exception = function(exceptionName) {
  var exception = function(message) {
    this.message = message;
  };
  exception.prototype.toString = function() {
    return exceptionName + ": " + this.message;
  };
  return exception;
};

storyengine.StoryInvalidEventException = storyengine.Exception("StoryInvalidEventException");
storyengine.StoryUnknownEventException = storyengine.Exception("StoryUnknownEventException");