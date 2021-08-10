/**
 * This class can hold information stored in the letter.
 * 
 * @author 5kWBassMachine [https://github.com/fivekWBassMachine]
 * @version 1.0.0
 */
class Letter {

	/**
	 * Creates an instance of Letter.
	 * 
	 * @param {Number} linesBetweenTopics - Newlines (\n) between topics
	 * @param {Letter~datasetChangedListener} datasetChangedListener - The eventlistener when any data has been changed
	 * @param {Letter~updateTextareaListener} updateTextareaListener - The eventlistener when the topics has been changed
	 * @since 1.0.0
	 */
	constructor(linesBetweenTopics, datasetChangedListener, topicsChangedListener) {
		this._sender = null;
		this._receiver = null;
		this._topics = [];
		this._linesBetweenTopics = stringOfNChars(linesBetweenTopics, '\n');
		this._datasetChangedListener = datasetChangedListener;
		this._topicsChangedListener = topicsChangedListener;
	}

	/**
	 * @param {Address} address - The address of the sender
	 * @since 1.0.0
	 */
	set sender(address) {
		this._sender = address;
		this._datasetChanged();
	}

	/**
	 * @param {Address} address - The address of the receiver
	 * @since 1.0.0
	 */
	set receiver(address) {
		this._receiver = address;
		this._datasetChanged();
	}

	/**
	 * @param {Topic[]} topics - The chosen topics of the letter
	 * @since 1.0.0
	 */
	set topics(topics) {
		this._topics = topics;
		this._datasetChanged();
		this._topicsChangedListener();
	}

	/**
	 * Checks if a valid sender is set.
	 *
	 * @return {Boolean} Whether a valid sender is set
	 * @since 1.0.0
	 */
	hasSender() {
		return this._sender && this._sender.__proto__.constructor === Address;
	}

	/**
	 * Checks if a valid receiver is set.
	 *
	 * @return {Boolean} Whether a valid receiver is set
	 * @since 1.0.0
	 */
	hasReceiver() {
		return this._receiver && this._receiver.__proto__.constructor === Address;
	}

	/**
	 * Generates the main part ('preview') of the letter in plain text.
	 * 
	 * @returns {String} The main part
	 * @since 1.0.0
	 */
	build() {
		// sort topics by their indexes
		var orderedTopics = this._topics;
		var text = '';
		orderedTopics.sort((a, b) => a.index - b.index);
		orderedTopics.forEach((topic) => {
			text += topic.text + this._linesBetweenTopics;
		});
		return text;
	}

	/**
	 * Generates a PDF from the current information when the letter is generatable
	 * 
	 * @returns {undefined} The PDF
	 * @throws {Error} MissingDataException - When the letter is not generatable
	 * @since 1.0.0
	 */
	generate() {
		if (this._isGeneratable()) {
			throw new Error('NotImplementedException');
		}
		else {
			throw new Error('MissingDataException');
		}
	}

	/**
	 * Checks whether the letter has all data to be generated or not.
	 *
	 * @return {Boolean} Whether the letter is generatable or not 
	 * @since 1.0.0
	 */
	_isGeneratable() {
		return this.hasReceiver() && this.hasSender() && this._topics.length != 0
	}

	/**
	 * Internal Callback when any data has been changed.
	 *
	 * @since 1.0.0
	 */
	_datasetChanged() {
		// When the dataset has changed, check if the letter can be generated or if some data is missing. Then call the listener with that information.
		if (this._isGeneratable()) this._datasetChangedListener();
	}

	/**
	 * This method is called when the dataset has been changed.
	 * 
	 * @callback Letter~datasetChangedListener
	 * @param {Boolean} generatable - Whether the letter has all data to be generated or not.
	 */

	/**
	 * This method is called when the topics have been changed.
	 * 
	 * @callback Letter~datasetChangedListener
	 */
}

/** @enum */
const AddressScope = {
	EU: 0,
	MEMBERSTATE: 1,
	OTHER: 2
}

class Address {

	/**
	 * Creates an instance of Address.
	 * 
	 * @param {String} country
	 * @param {String} province
	 * @param {String} postcode
	 * @param {String} city
	 * @param {String} streetAddress
	 * @param {String} name
	 * @since 1.0.0
	 */
	constructor(country, province, postcode, city, streetAddress, name) {
		this._country = country;
		this._province = province;
		this._postcode = postcode;
		this._city = city;
		this._streetAddress = streetAddress;
		this._name = name;
	}

	/**
	 * Returns the location relative to the scope.
	 *
	 * @param {AddressScope} scope - The scope of the location
	 * @since 1.0.0
	 */
	getLocation(scope) {
		if (scope === AddressScope.EU) {
			return this._country;
		}
		else if (scope === AddressScope.MEMBERSTATE) {
			return this._city;
		}
		return `${this._country} / ${this._city}`;
	}

	toString() {

	}
}

class Topic {

	/**
	 * Creates an instance of Topic.
	 * 
	 * @param {String} name - The name of the topic
	 * @param {String} description - A short description of the topic
	 * @param {String} text - The text to insert into the letter
	 * @param {Number} index - The position of this topic in the letter
	 * @param {Topic[]} [children=[]] - All child topics
	 * @since 1.0.0
	 */
	constructor(name, description, text, index, children = []) {
		this._name = name;
		this._description = description;
		this._text = text;
		this._index = index;
		this.select();
		this.children = children;
	}

	/**
	 * Sets this topic as selected.
	 * @see Topic.selected({Boolean})
	 *
	 * @since 1.0.0
	 */
	select() {
		this.selected = true;
	}

	/**
	 * Sets this topic as deselected.
	 * @see Topic.selected({Boolean})
	 *
	 * @since 1.0.0
	 */
	deselect() {
		this.selected = false;
	}

	/**
	 * @param {Boolean} selected - Whether this topic is selected or not
	 * @since 1.0.0
	 */
	set selected(selected) {
		this._selected = selected;
	}

	/**
	 * @param {Topic[]} children - The child topics
	 * @since 1.0.0
	 */
	set children(children) {
		this._children = children;
	}

	/**
	 * @param {Topic} child - The child topic to append
	 * @since 1.0.0
	 */
	set addChild(child) {
		this._children.push(child);
	}

	/**
	 * @return {String} The name of the topic
	 * @memberof Topic
	 */
	get name() {
		return this._name;
	}

	/**
	 * @return {String} The description of the topic
	 * @memberof Topic
	 */
	get description() {
		return this._description;
	}

	/**
	 * @return {String} The text of the topic
	 * @memberof Topic
	 */
	get text() {
		return this._text;
	}

	/**
	 * @return {Boolean} Whether this topic is selected or not 
	 * @since 1.0.0
	 */
	get selected() {
		return this._selected;
	}

	/**
	 * @return {Number} The position of this topic in the letter
	 * @since 1.0.0
	 */
	get index() {
		return this._index;
	}

	/**
	 * @return {Topic[]} The child topics
	 * @since 1.0.0
	 */
	get children() {
		return this._children;
	}
}