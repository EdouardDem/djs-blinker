/**
 * @author Edouard Demotes-Mainard <https://github.com/EdouardDem>
 * @license http://opensource.org/licenses/BSD-2-Clause BSD 2-Clause License
 */

/**
 * Object djs for namespace
 */
window.djs = window.djs || {};

/**
 * This class makes blinking a jQuery element using a CSS class and/or CSS properties
 * This class is 'chainable'
 *
 * @param {Object} $element
 * @param {Object} options
 *
 * Default options :
 * {
 * 		class: 'djs-blink', // null to disable
 * 		duration: 300, // semi-cycle
 * 		count: 5, // cycles count
 * 		css: null // Example : { color: 'red', opacity: 0.5 }
 * }
 */
djs.Blinker = function ($element, options) {

	// Define default options
	var defaultOptions = {
		class: 'djs-blink',
		duration: 300,
		count: 5,
		css: null
	};

	// Set the properties
	this.$element = $element;
	this.options = $.extend(defaultOptions, options);
	this.timeouts = [];
	this.interval = null;
};
/**
 * Set the 'on' state
 *
 * @private
 * @return {Object}
 */
djs.Blinker.prototype._on = function() {

	// If we have to add CSS class
	if (this.options.class) {
		this.$element.addClass(this.options.class);
	}

	// If we have to add CSS properties
	if (this.options.css) {
		this.$element.css(this.options.css);
	}
	return this;
};
/**
 * Set the 'off' state
 *
 * @private
 * @return {Object}
 */
djs.Blinker.prototype._off = function() {

	// If we have to remove CSS class
	if (this.options.class) {
		this.$element.removeClass(this.options.class);
	}

	// If we have to remove CSS properties
	if (this.options.css) {
		var offCss = {};
		for (var prop in this.options.css) {
			if (this.options.css.hasOwnProperty(prop)) {
				offCss[prop] = "";
			}
		}
		this.$element.css(offCss);
	}

	return this;
};
/**
 * Cleanup all timeouts
 *
 * @private
 * @return {Object}
 */
djs.Blinker.prototype._clearTimeouts = function() {
	// Clear all timeouts
	this.timeouts.map(function(timeout){
		clearTimeout(timeout);
	});
	this.timeouts = [];

	return this;
};
/**
 * Cleanup interval
 *
 * @private
 * @return {Object}
 */
djs.Blinker.prototype._clearInterval = function() {
	// Clear interval
	clearInterval(this.interval);
	this.interval = null;

	return this;
};
/**
 * Start the animation
 *
 * @param {Function} callback (optional)
 * @return {Object}
 */
djs.Blinker.prototype.start = function(callback) {

	// Stop a pending animation
	this.stop();

	// Push the timeouts in the queue
	for(var i=0; i<this.options.count; i++) {

		// On timeouts
		this.timeouts.push(setTimeout(function(){
			this._on();
		}.bind(this), (2*i)*this.options.duration));

			// Off timeouts
		this.timeouts.push(setTimeout(function(){
			this._off();
		}.bind(this), (2*i+1)*this.options.duration));
	}

	// Final timeout
	this.timeouts.push(setTimeout(function() {

		// Call the stop method to clean up object
		this.stop();

		// If a callback is defined, call it.
		if (typeof callback == 'function') callback();

	}.bind(this), (2*this.options.count-1)*this.options.duration));


	return this;
};
/**
 * Start the animation and never end
 *
 * @return {Object}
 */
djs.Blinker.prototype.infinite = function() {

	// Stop a pending animation
	this.stop();

	// Define the blink function
	var blink = function() {

		// Clear timeout
		this._clearTimeouts();

		// Cleanup previous
		this._on();

		// Delay the off
		this.timeouts.push(setTimeout(function(){
			this._off();
		}.bind(this), this.options.duration));

	}.bind(this);

	// Set an interval for each cycle
	this.interval = setInterval(blink, this.options.duration * 2);

	// Blink immediately
	blink();

	return this;
};
/**
 * Stop the animation
 *
 * @return {Object}
 */
djs.Blinker.prototype.stop = function() {

	// Clear timeouts
	this._clearTimeouts();

	// Clear interval
	this._clearInterval();

	// Remove classes and properties
	this._off();

	return this;
};



