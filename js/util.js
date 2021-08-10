/* A collection of code, ripped from Stackoverflow & Co... */

/**
 * An Utility to create Enums.
 *
 * @param {*} values - The items of the Enum
 * @return {*} The Enum
 */
function Enum(values) {
	for( var i = 0; i < values.length; ++i ){
		this[values[i]] = i;
	}
	return this;
}

/**
 * Returns a String of n times a c.
 * 
 * Example:
 * n = 10, c = '\n'
 * x = '\n\n\n\n\n\n\n\n\n\n'
 *
 * @param {Number} n - The amount of c
 * @param {*} c - The character (or String) to repeat
 * @return {String} The new String 
 */
function stringOfNChars(n, c) {
	return Array(n + 1).join(c);
}