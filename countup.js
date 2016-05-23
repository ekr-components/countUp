var components = components || {};

jQuery(document).ready(function() {
	jQuery('[data-component="countup"]').each(function() { 
		var countUp = new components.countUp(this); 
	});
});

components.countUp = function(el) {
	var self = this;
	self.el = jQuery(el);
	self.initString = self.el.text();
	self.initNum = self.el.text().match(/[0-9,.]+/)[0];
	self.initNum = self.initNum.replace(',','');
	self.direction = self.data('countup-direction');
	if(!self.direction) {
		if(self.initNum < 10) {
			self.direction = 'down';
		} else {
			self.direction = 'up';
		}
	}
	if(String(self.initNum.indexOf('.')) != -1) {
		self.initNum = parseFloat(self.initNum);
	} else {
		self.initNum = parseInt(self.initNum);
	}
	if(self.direction === 'down') {
		self.startNum = 100 * self.initNum;
		self.increment = self.startNum / 100;
	} else {
		self.startNum = 0;
		self.increment = self.initNum / 100;
		if(self.initNum > 100) {
			self.increment = parseInt(self.increment);
		}
	}
	self.template = self.el.text().trim().replace(/[0-9.,]+/g, "{{num}}");
	self.init();
};
components.countUp.prototype = {
	init: function() {
		var self = this;
		self.el.on('count', function() {
			self.count();
		});
	},
	count: function() {
		var self = this;
		self.currentNum = self.startNum;
		self.el.text(self.template.replace('{{num}}', self.startNum));
		self.interval = setInterval(function() {
			if(self.direction == 'up') {
				self.currentNum += self.increment;
			} else {
				self.currentNum -= self.increment;
			}
			if(
				(self.direction == 'up' && self.currentNum >= self.initNum) ||
				(self.direction == 'down' && self.currentNum <= self.initNum)
			) {
				clearInterval(self.interval);
				self.el.text(self.initString);
			} else {
				if(String(self.currentNum).indexOf('.') !== -1) {
					self.el.text(self.template.replace('{{num}}', parseFloat(self.currentNum).toFixed(1)));
				} else {
					self.el.text(self.template.replace('{{num}}', self.currentNum));
				}
			}
		}, 20);
	},
};
