var storyengine = storyengine || {};
/**
  * Class describing a branching story and controlling flow of events
  * @constructor
  */
storyengine.Story = (function() {
  var constructor = function(a) {
    /** The events tracked by this Story
     * @type {Object.<string, storyengine.Event>}
     * @private
     */
    this._events = {};
    /** The events tracked by this Story that are capable of being triggered
     * @type {string[]}
     * @private
     */
    this._triggerableEvents = [];
    /** The events tracked by this Story that are not capable of being triggered, but could become capable
     * @type {string[]}
     * @private
     */
    this._suspendedEvents = [];
    /** The events tracked by this Story that are no longer capable of being triggered
     * @type {string[]}
     * @private
     */
    this._finishedEvents = [];
  };
  /** Start tracking an event, triggering it if prerequisites are met
   * @param {storyengine.Event} event The event to be added
   */
  constructor.prototype.addEvent = function(event) {
    if(!event.prerequisites) {
      throw new storyengine.StoryInvalidEventException('Event must have prerequisites');
    }
    if(!event.identifier || this._events[event.identifier]) {
      throw new storyengine.StoryInvalidEventException('Event must have a unique identifier');
    }
    this._events[event.identifier] = event;
    if(event.suspended) {
      this._suspendedEvents.push(event.identifier);
    }
    else {
      this._triggerableEvents.push(event.identifier);
    }
  };
  
  /** Start tracking an event, triggering it if prerequisites are met
   * @param {storyengine.Event|string} event The event to be removed, or the identifier of the event to be removed
   */
  constructor.prototype.removeEvent = function(event) {
    var id = event.identifier || event;
    if(!this._events[id]) {
      throw new storyengine.StoryUnknownEventException('removeEvent attempted on unknown event');
    }
    var index = this._triggerableEvents.indexOf(id);
    if(index != -1) {
      this._triggerableEvents.splice(index, 1);
    }
    index = this._suspendedEvents.indexOf(id);
    if(index != -1) {
      this._suspendedEvents.splice(index, 1);
    }
    index = this._finishedEvents.indexOf(id)
    if(index != -1) {
      this._finishedEvents.splice(index, 1);
    }
    
    this._events[id] = null;
  };
  /** Iterates through the list of events, checking each for their prerequisites. Will only trigger one event per call
    * @returns {boolean} Whether an event was triggered
    */
  constructor.prototype.checkEventTriggers = function() {
    for(var i = 0; i < this._triggerableEvents.length; i++) {
      if(this._triggerableEvents[i].checkTrigger()) {
        this._doEventTrigger(this._triggerableEvents[i]);
        return true;
      }
    }
    return false;
  }
  
  constructor.prototype._doEventTrigger = function(event) {
    event.trigger(this);
    if(event.done) {
      this._finishedEvents.push(event);
    }
    if(event.suspended) {
      this._suspendedEvents.push(event);
    }
    if(event.suspended || event.done) {
      this._triggerableEvents.slice(this._triggerableEvents.indexOf(event));
    }
  }
  
  return constructor;
})();
