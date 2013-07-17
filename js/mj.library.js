/*=====================================================
*
*	_JL : A Really Small JavaScript framework
*	(c) Michael Jasper 2011
*
======================================================*/

/*	_ Object Constructor
========================*/

function _(id) {

	// About object is returned if there is no 'id' parameter
	var about = {
		Version: 0.5,
		Author: "Michael Jasper",
		Created: "Fall 2010",
		Updated: "23 November 2011"
	};

	if (id) {

		// Avoid clobbering the window scope: 
		// return a new _ object if we're in the wrong scope
		if (window === this) {
			return new _(id);
		}

		// We're in the correct object scop:
		// Init our element object and return the object
		this.e = document.getElementById(id);
		return this;
	} else {
		// No 'id' paramter was given, return the 'about' object
		return about;
	}
}

/*	_ Prototype Functions
============================*/

_.prototype = {
	hide:	function () {
				this.e.style.display = 'none';
				return this;
			},

	show:	function () {
				this.e.style.display = 'inherit';
				return this;
			},

	bgcolor: function (color) {
				this.e.style.background = color;
				return this;
			},

	val:	function (newval) {
				this.e.value = newval;
				return this;
			},

	toggle: function () {
				if (this.e.style.display !== 'none') {
					this.e.style.display = 'none';
				} else {
					this.e.style.display = '';
				}
				return this;
			},

	size:	function (height, width) {
				this.e.style.height = height + 'px';
				this.e.style.width = width + 'px';
				return this;
			}
};