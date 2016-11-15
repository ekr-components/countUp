var components = components || {};

jQuery(document).ready(function() {
	jQuery('[data-component="countup"]').each(function() {
		var countUp = new components.countUp(this);
	});
});

components.countUp = function(el) {
	this.el = jQuery(el);
	this.initString = this.el.text();
	this.initNum = this.el.text().match(/[0-9,.]+/)[0];
	this.initNum = this.initNum.replace(',','');
	this.direction = this.data('countup-direction');
	if(!this.direction) {
		if(this.initNum < 10) {
			this.direction = 'down';
		} else {
			this.direction = 'up';
		}
	}
	if(String(this.initNum.indexOf('.')) != -1) {
		this.initNum = parseFloat(this.initNum);
	} else {
		this.initNum = parseInt(this.initNum);
	}
	if(this.direction === 'down') {
		this.startNum = 100 * this.initNum;
		this.increment = this.startNum / 100;
	} else {
		this.startNum = 0;
		this.increment = this.initNum / 100;
		if(this.initNum > 100) {
			this.increment = parseInt(this.increment);
		}
	}
	this.template = this.el.text().trim().replace(/[0-9.,]+/g, "{{num}}");
	this.init();
};
components.countUp.prototype = {
	init: function() {
		this.el.on('count', this.count.bind(this));
	},
	count: function() {
		this.currentNum = this.startNum;
		this.el.text(this.template.replace('{{num}}', this.startNum));
		this.interval = setInterval(function() {
			if(this.direction == 'up') {
				this.currentNum += this.increment;
			} else {
				this.currentNum -= this.increment;
			}
			if(
				(this.direction == 'up' && this.currentNum >= this.initNum) ||
				(this.direction == 'down' && this.currentNum <= this.initNum)
			) {
				clearInterval(this.interval);
				this.el.text(this.initString);
			} else {
				if(String(this.currentNum).indexOf('.') !== -1) {
					this.el.text(this.template.replace('{{num}}', parseFloat(this.currentNum).toFixed(1)));
				} else {
					this.el.text(this.template.replace('{{num}}', this.currentNum));
				}
			}
		}.bind(this), 20);
	},
};
