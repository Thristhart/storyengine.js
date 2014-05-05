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
     * @type {storyengine.Event[]}
     * @private
     */
    this._triggerableEvents = [];
    /** The events tracked by this Story that are no longer capable of being triggered
     * @type {storyengine.Event[]}
     * @private
     */
    this._finishedEvents = [];
  };
  /** Start tracking an event, triggering it if prerequisites are met
   * @param {storyengine.Event} event The event to be added
   */
  constructor.prototype.addEvent = function(event) {
    // TODO: Ensure event is valid
    // TODO: Add the event to internal list
  };
  
  /** Start tracking an event, triggering it if prerequisites are met
   * @param {storyengine.Event} event The event to be removed
   */
  constructor.prototype.removeEvent = function(eventSpecifier) {
    // TODO: Ensure we have the event
    // TODO: Remove the event
  };
  /** Iterates through the list of events, checking each for their prerequisites 
    */
  constructor.prototype.checkEventTriggers = function() {
    // TODO: iterate through each triggerable event and check its trigger
  }
  
  return constructor;
})();