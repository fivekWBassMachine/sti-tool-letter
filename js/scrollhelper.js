/**
 * This class scrolls to predefined positions. Additionally, it adds anchors before headlines except `h1`.
 * 
 * For smooth scrolling, add this snipped to your CSS stylesheet:
 * ```css
 * html {
 *     scroll-behavior: smooth;
 * }
 * ```
 * 
 * @author 5kWBassMachine [https://github.com/fivekWBassMachine]
 * @version 1.0.0
 */
 class ScrollHelper {
	
	/**
	 * @param {String[]} positions - The positions.
	 * @param {Boolean} [loopDown=true] - Whether to scroll to the first position when the last position is reached
	 * @param {Boolean} [loopUp=true] - Whether to scroll to the last position when the first position is reached
	 * @since 1.0.0
	 */
	constructor(positions, loopDown = true, loopUp = false) {
		this._positions = positions;
		this._position = location.hash.lenght == 0 ? 0 : this._positions.indexOf(location.hash.replace('#', ''));
		if (this._position == -1) this.scrollTo(0);
		this._loopDown = loopDown;
		this._loopUp = loopUp;
		positions.forEach((position, i) => {
			if (position !== '#') {
				var id = `#${position}`;
				var headline = $(id);
				$(`<div class="${Array.from(headline[0].classList).join(' ')}"><i class="anchor fas fa-link"></i></div>`)
					.insertBefore(id)
					.append(headline);
				headline.removeClass();
			}
		});
		$('.anchor').click((e) => {
			scrollHelper.scrollTo(e.currentTarget.nextElementSibling.id);
		});
	}
	
	/**
	 * Scrolls to a specific position.
	 * 
	 * @param {(Number|String)} position - Either the position index or the position name
	 * @return {Boolean} Whether the position has been changed or not
	 * @since 1.0.0
	 */
	scrollTo(position) {
		if (isNaN(position)) {
			position = this._positions.indexOf(position);
			if (position == -1) return false; 
		}
		else {
			this._position = position;
		}
		location.hash = this._positions[position];
		return true;
	}
	
	/**
	 * Scrolls one position down. When the current position is the last one and loopDown is true it scrolls to the first position.
	 * 
	 * @return {Boolean} Whether the position has been changed or not
	 * @since 1.0.0
	 */
	scrollDown() {
		if (this._position < this._positions.length - 1) {
			this._position++;
		}
		else if (this._loopDown) {
			this._position = 0;
		}
		else {
			return false;
		}
		location.hash = this._positions[this._position];
		return true;
	}
	
	/**
	 * Scrolls one position up. When the current position is the first one and loopUp is true it scrolls to the last position.
	 * 
	 * @return {Boolean} Whether the position has been changed or not
	 * @since 1.0.0
	 */
	scrollUp() {
		if (this._position > 0) {
			this._position--;
		}
		else if (this._loopUp) {
			this._position = this._positions.length - 1;
		}
		else {
			return;
		}
		location.hash = this._positions[this._position];
	}
};