angular.module('message', []).controller('message', function($http) {
	var self = this;
	self.user = '';
	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	self.date = new Date().toLocaleDateString('en-US', options);
	$http.get('/user/').then(function(response) {
		self.user = response.data.name;
	});
});
