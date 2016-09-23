angular.module('message', []).controller('message', function($http, AjaxSrv) {
    var self = this;
    self.user = '';
    self.weather = null;
    self.battle = null;
    self.date = new Date().toLocaleDateString('en-US',
        {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});

    $http.get('/user/').then(function(response) {
        self.user = response.data.name;
    });

    var req = {
        type: "GET",
        url:"http://www.dragonsofmugloar.com/api/game"
    };

    AjaxSrv.request(req).then(function(data) {
        self.battle = data;
        req.url = "http://www.dragonsofmugloar.com/weather/api/report/" + self.battle.gameId;
        AjaxSrv.requestXML(req, "message").then(function(weather) {
            self.weather = weather;
        });
    });
});
