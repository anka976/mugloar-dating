angular.module('home', []).controller('home', function($http, HomeSrv, $uibModal ) {
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
			type: "GET",
			url:"http://www.dragonsofmugloar.com/dating/api/profile/random?gender="+gender
		};
		for (i = 0; i < 3; i++) {
			HomeSrv.getMate(req).then(function(data) {
				self.mates.push(data);
			});
		}

	};
	self.showMate = function (mate) {
		var modalInstance = $uibModal.open({
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

	angular.module('home').service('HomeSrv', HomeSrv);

	HomeSrv.$inject = ['$q'];

	function HomeSrv ($q) {
		return {
			getMate: function(req) {
				var deferred = $q.defer();
				$.ajax(req).done(function( data ) {
					deferred.resolve(data);
				}).fail(function( data ) {
					console.log(data);
				});
				return deferred.promise;
			}
		};
	}
})();
