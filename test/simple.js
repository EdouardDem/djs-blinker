/**
 * Log function
 *
 * @param {String} text
 */
displayLog = function (text) {
    $('.results').append('<div>' + text + '</div>');
    console.log(text);
};
/**
 * Clear log
 */
clearLog = function () {
    $('.results').html('');
    console.clear();
};
/**
 * Used to store the blinkers
 *
 * @type {Array}
 */
var blinkers = [];
/**
 * Start a blinking effect
 *
 * @param {Number} index
 */
start = function(index) {
	$('#start-'+index).addClass('hidden');
	$('#stop-'+index).removeClass('hidden');
	blinkers[index-1].start(function() {
		displayLog("Did finish blinking for index "+index);
		$('#start-'+index).removeClass('hidden');
		$('#stop-'+index).addClass('hidden');
	});
};
/**
 * Stop a blinking effect
 *
 * @param {Number} index
 */
stop = function(index) {
	blinkers[index-1].stop();
	$('#start-'+index).removeClass('hidden');
	$('#stop-'+index).addClass('hidden');
};

/**
 * Init test
 */
$(document).ready(function () {
    blinkers.push(new djs.Blinker($("#test-1")));
	blinkers.push(new djs.Blinker($("#test-2"), {
		class: null,
		duration: 700,
		count: 3,
		css: {
			backgroundColor: "coral",
			boxShadow: "0px 0px 30px 5px coral"
		}
	}));
	blinkers.push(new djs.Blinker($("#test-3"), {
		class: 'djs-blink-2',
		duration: 500,
		count: 4,
		css: {
			borderColor: "coral"
		}
	}));
});