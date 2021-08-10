/**
 * Creates a HTML code for smooth search forms (CSS and Font Awesome required)
 *
 * @author 5kWBassMachine [https://github.com/fivekWBassMachine]
 * @version 1.0.0
 */
 class Search {

	/**
	 * Creates an instance of Search and returns the HTML code of it.
	 * 
	 * @param {String} id - The ID for CSS
	 * @param {String} dataId - The ID for JS
	 * @param {String} [placeholder='Search'] - The text displayed right to the checkbox
	 * @param {boolean} [disabled=false] - Whether the checkbox is disabled or not
	 * @since 1.0.0
	 */
	static createHTML(id, dataId, placeholder = 'Search', disabled = false) {
		return (new Checkbox(id, dataId, placeholder, disabled)).toString();
	}

	/**
	 * Creates an instance of Search.
	 * 
	 * @param {String} id - The ID for CSS
	 * @param {String} dataId - The ID for JS
	 * @param {String} [placeholder='Search'] - The text displayed right to the checkbox
	 * @param {boolean} [disabled=false] - Whether the checkbox is disabled or not
	 * @since 1.0.0
	 */
	constructor(id, dataId, placeholder = 'Search', disabled = false) {
		this._html = `<form id="${id}" class="search" data-id="${dataId}"><input type="search" placeholder="${placeholder}" ${disabled ? 'disabled ': ''}/><button class="clickable" type="submit"><i class="fa fa-search"></i></button></form>`;
	}

	/**
	 * @return {String} The HTML code
	 * @since 1.0.0
	 */
	toString() {
		return this._html;
	}
}

/**
 * Creates a HTML code for smooth checkboxes (CSS required)
 *
 * @author 5kWBassMachine [https://github.com/fivekWBassMachine]
 * @version 1.0.0
 */
class Checkbox {

	/**
	 * Creates an instance of Checkbox and returns the HTML code of it.
	 * 
	 * @param {String} id - The ID for CSS
	 * @param {String} name - The name attribute
	 * @param {String} [label] - The text displayed right to the checkbox
	 * @param {String} [description] - The optional description, displayed below the label
	 * @param {boolean} [disabled=false] - Whether the checkbox is disabled or not
	 * @since 1.0.0
	 */
	static createHTML(id, name, label, description = undefined, disabled = false) {
		return (new Checkbox(id, name, label, description, disabled)).toString();
	}

	/**
	 * Creates an instance of Checkbox.
	 * 
	 * @param {String} id - The ID for CSS
	 * @param {String} name - The name attribute
	 * @param {String} label - The text displayed right to the checkbox
	 * @param {String} [description] - The optional description, displayed below the label
	 * @param {boolean} [disabled=false] Whether the checkbox is disabled or not
	 * @since 1.0.0
	 */
	constructor(id, name, label, description = undefined, disabled = false) {
		this._html = `<div class="checkbox"><div><input type="checkbox" class="clickable" id="${id}" name="${name}" ${disabled ? 'disabled ': ''}/><label for="${id}">${label}</label></div>${typeof description === 'string' ? `<p>${description}</p>`: ''}</div><br />`;
	}

	/**
	 * @return {String} The HTML code
	 * @since 1.0.0
	 */
	toString() {
		return this._html;
	}
}
