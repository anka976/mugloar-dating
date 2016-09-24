angular.module('home', []).controller('home', function($http, AjaxSrv, $uibModal ) {
	var self = this;

	self.boy = true;
	self.mates = [];

	$http.get('/user/').then(function(response) {
		self.user = response.data.name;
	});

	self.getNewMates = function(isBoy) {
		self.mates = [];
		self.boy = isBoy;
		var gender = self.boy ? "boy" : "girl";

		var req = {
			async: false,
			type: "GET",
			url:"http://www.dragonsofmugloar.com/dating/api/profile/random?gender="+gender
		};
		for (var i = 0; i < 3; i++) {
			AjaxSrv.request(req).then(function(data) {
				self.mates.push(data);
			});
		}

	};
	self.showMate = function (mate) {
		$uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'myModalContent.html',
			controller: 'ModalInstanceCtrl',
			controllerAs: 'controller',
			size: 'lg',
			resolve: {
				mate: function() {
					return mate;
				}
			}
		});
	};
	self.getNewMates(true);

});

angular.module('home').controller('ModalInstanceCtrl', function ($uibModalInstance, mate) {
	var $ctrl = this;
	$ctrl.mate = mate;
	$ctrl.lighted = false;

	$ctrl.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});

(function() {
	'use strict';

	angular.module('home').service('AjaxSrv', AjaxSrv);

	AjaxSrv.$inject = ['$q'];

	function AjaxSrv ($q) {
		return {
			request: function(req) {
				var deferred = $q.defer();
				$.ajax(req).done(function( data ) {
					deferred.resolve(data);
				}).fail(function( data ) {
					deferred.reject(data);
				});
				return deferred.promise;
			},
			requestXML: function(req, prop) {
				var deferred = $q.defer();
				$.ajax(req).done(function( data ) {
					if (prop) {
						deferred.resolve($( data ).find( prop ).text());
					} else {
						deferred.resolve($( data ));
					}
				}).fail(function( data ) {
					deferred.reject(data);
				});
				return deferred.promise;
			}
		};
	}
})();
