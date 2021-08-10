// TODO 2021-08-05: use api
const POLITICIANS = [
	{
		name: {first: 'Angelo', last: 'Merte'},
		fraction: 'SPD',
		address: new Address('Deutschland', 'Rheinland-Pfalz', 12345, 'Mainz', 'Bahnhofstraße 13', 'Angelo Merte')
	},
	{
		name: {first: 'Angelo', last: 'Merte'},
		fraction: 'SPD',
		address: new Address('Deutschland', 'Rheinland-Pfalz', 12345, 'Mainz', 'Bahnhofstraße 13')
	},
	{
		name: {first: 'Angelo', last: 'Merte'},
		fraction: 'SPD',
		address: new Address('Deutschland', 'Rheinland-Pfalz', 12345, 'Mainz', 'Bahnhofstraße 13')
	},
	{
		name: {first: 'Angelo', last: 'Merte'},
		fraction: 'SPD',
		address: new Address('Deutschland', 'Rheinland-Pfalz', 12345, 'Mainz', 'Bahnhofstraße 13')
	},
	{
		name: {first: 'Angelo', last: 'Merte'},
		fraction: 'SPD',
		address: new Address('Deutschland', 'Rheinland-Pfalz', 12345, 'Mainz', 'Bahnhofstraße 13')
	},
	{
		name: {first: 'Angelo', last: 'Merte'},
		fraction: 'SPD',
		address: new Address('Deutschland', 'Rheinland-Pfalz', 12345, 'Mainz', 'Bahnhofstraße 13')
	},
	{
		name: {first: 'Angelo', last: 'Merte'},
		fraction: 'SPD',
		address: new Address('Deutschland', 'Rheinland-Pfalz', 12345, 'Mainz', 'Bahnhofstraße 13')
	},
	{
		name: {first: 'Angelo', last: 'Merte'},
		fraction: 'SPD',
		address: new Address('Deutschland', 'Rheinland-Pfalz', 12345, 'Mainz', 'Bahnhofstraße 13')
	},
	{
		name: {first: 'Angelo', last: 'Merte'},
		fraction: 'SPD',
		address: new Address('Deutschland', 'Rheinland-Pfalz', 12345, 'Mainz', 'Bahnhofstraße 13')
	},
	{
		name: {first: 'Angelo', last: 'Merte'},
		fraction: 'SPD',
		address: new Address('Deutschland', 'Rheinland-Pfalz', 12345, 'Mainz', 'Bahnhofstraße 13')
	},
];
// TODO 2021-08-05: use api
const SCOPES = [
	{
		name: '[DE] MdB',
		scope: AddressScope.MEMBERSTATE,
		politicians: POLITICIANS
	},
	{
		name: '[EU] MeP',
		scope: AddressScope.EU,
		politicians: POLITICIANS
	},
	{
		name: 'Other',
		scope: AddressScope.OTHER,
		politicians: POLITICIANS
	}
];
// TODO 2021-08-05: use api
const TOPICS = [
	new Topic('Copyright Directive', 'See https://savetheinternet.info/en/urheberechtsrrichtlinie/ for more information.', 'Sixthly, Copyright Directive is very important for me because of foo.', 5, []),
	new Topic('TERREG', 'See https://savetheinternet.info/en/terreg/ for more information.', 'Fifthly, TERREG is very important for me because of foo.', 4, []),
	new Topic('E2EE', 'See https://savetheinternet.info/en/e2ee/ for more information.', 'Fourthly, E2EE is very important for me because of foo.', 3, []),
	new Topic('Chatcontrol', 'See https://savetheinternet.info/en/chatkontrolle/ for more information.', 'Thirdly, Chatcontrol is very important for me because of foo.', 2, []),
	new Topic('DSA &amp; DMA', 'See https://savetheinternet.info/en/dsa/ for more information.', 'Secondly, DSA &amp; DMA is very important for me because of foo.', 1, []),
	new Topic('Hatespeech', 'See https://savetheinternet.info/en/hatespeech/ for more information.', 'I have a few topics, I want to tell you.\nFirstly, Hatespeech is very important for me because of foo.', 0, []),
];

/**
 * @constant
 * @type {ScrollHelper}
 * @default
 */
var scrollHelper;
/**
 * @constant
 * @type {Letter}
 * @default
 */
var letter;

/**
 * Updates the politicians table.
 *
 * @param {Object} scope - The scope to use
 */
function updatePoliticiansTable(scope) {
	var target = $('[data-id="politicians-list"] > tbody');
	target.text('');
	for (var i = 0; i < scope.politicians.length; i++) target.append(`<tr class="clickable" data-class="politician"><td>${scope.politicians[i].name.last}</td><td>${scope.politicians[i].name.first}</td><td>${scope.politicians[i].fraction}</td><td>${scope.politicians[i].address.getLocation(scope.scope)}</td></tr>`);
	letter.receiver = null;
}

const InfoType = {'INFO': 'info', 'WARN': 'warn', 'ERROR': 'error'}
/**
 * Updates the info element.
 *
 * @param {InfoType} type - The new type of the element. 
 * @param {*} text - The text of the element (will be applied with jQuery.html()).
 */
function updateInfo(type, text) {
	$('[data-id="info"]').removeClass('info warn error').addClass(type).html(text);
}

$().ready(() => {
	// init scroll utility
	scrollHelper = new ScrollHelper(['#', 'politicians', 'topics', 'sender', 'edit', 'download']);
	// init letter storage
	letter = new Letter(2, (generateable) => {
		// update download buttons
		$('[data-id="download-pdf"]').prop('disabled', !generateable);
		$('[data-id="download-print"]').prop('disabled', !generateable);
	}, () => {
		// update textarea
		$('[data-id="edit-text"]').text(letter.build());
	});
	// init search bar
	$(new Search('politicians-search', 'politicians-search').toString()).insertAfter('[data-id="politicians-scope"]');
	// display (= unhide) content (<main>)
	$('.hidden-noscript').removeClass('hidden-noscript');
	// set title (<h1>) to document title
	$('[data-id="title"]').text(document.title);

	// TODO 2021-08-04: DEBUG + --- use api
	// DEV: set disclaimer
	// TODO request from api
	updateInfo(InfoType.WARN, '<b>This tool is not functional!</b> It is considered for developing purposes. All texts or names are fictional.');
	// iterate through politicians scopes and add them to the DOM
	for (var i = 0; i < SCOPES.length; i++) $('[data-id="politicians-scope"]').append(`<option value="${i}">${SCOPES[i].name}</option>`);
	// add the politicians with the current scope (0) to the table
	updatePoliticiansTable(SCOPES[$('[data-id="politicians-scope"]').val()]);
	// iterate through the topics and add them to the DOM
	// don't use jQuery.append() because there are elements at the end of the form.
	var topics = '';
	for(var i = 0; i < TOPICS.length; i++) {
		topics += Checkbox.createHTML(`topics-${i}`, `${i}`, TOPICS[i].name, TOPICS[i].description);
		if (TOPICS[i].children.length != 0) for (var j = 0; j < TOPICS[i].children.length; j++) topics += Checkbox.createHTML(`topics-${i}-${j}`, `${i}-${j}`, TOPICS[i].children[i].name, TOPICS[i].children[i].description);
	}
	$('[data-id="topics-form"]').prepend(topics);
	// TODO 2021-08-04: DEBUG -
	
	// when a new politicians scope is selected
	$('[data-id="politicians-scope"]').change((e) => {
		// TODO 2021-08-05: use api response
		updatePoliticiansTable(SCOPES[e.currentTarget.value]);
	});
	// when the politicians search form is submitted
	$('[data-id="politicians-search"]').submit((e) => {
		e.preventDefault();
		// TODO 2021-08-04: implement searching
	});
	// when a politician is selected
	$('[data-class="politician"]').click((e) => {
		$('[data-class="politician"]').removeClass('selected');
		$(e.currentTarget).addClass('selected');
		// TODO 2021-08-04: use api response
		letter.receiver = POLITICIANS[e.currentTarget.sectionRowIndex].address;
		scrollHelper.scrollTo(letter.topics.length == 0 ? 'topics' : (letter.hasSender() ? 'edit' : 'sender'));
	})
	// when the topics form is submitted
	$('[data-id="topics-form"]').submit((e) => {
		e.preventDefault();
		var topics = $('[data-id="topics-form"]').serialize();
		if (topics.length != 0) {
			topics = topics.split('&');
			topics.forEach((topic, i) => {
				topics[i] = TOPICS[topic.split('=')[0]];
			});
			letter.topics = topics;
		}
		else {
			letter.topics = [];
		}
		// TODO 2021-08-05: maybe this is not user-friendly...
		scrollHelper.scrollTo(letter.hasSender() ? 'edit' : 'sender');
	});
	// when the sender form is submitted
	$('[data-id="sender-form"]').submit((e) => {
		e.preventDefault();
		var address = $('[data-id="sender-form"]').serialize();
		if (address.length != 0) {
			address = address.split('&');
			var parsedAddress = {};
			address.forEach((field) => {
				field = field.split('=');
				parsedAddress[field[0]] = field[1];
			});
			if (parsedAddress['sender-name'] && parsedAddress['sender-street'] && parsedAddress['sender-postcode'] && parsedAddress['sender-city'] && parsedAddress['sender-country']) {
				letter.sender = new Address(parsedAddress['sender-country'], null, parsedAddress['sender-postcode'], parsedAddress['sender-city'], parsedAddress['sender-street'], parsedAddress['sender-name']);
			}
			else {
				// TODO 2021-08-10 implement notification - check - is this an illegalstateexception i.e. user modified frontend?
				alert('Invalid Adress');
			}
		}
		scrollHelper.scrollTo('edit');
	});
});