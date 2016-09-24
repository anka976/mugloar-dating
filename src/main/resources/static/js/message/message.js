angular.module('message', []).controller('message', function($http, AjaxSrv) {
    var self = this;
    self.user = '';
    self.weather = null;
    self.weatherImg = null;
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
        AjaxSrv.requestXML(req).then(function(weather) {
            self.weather = weather.find("message").text();
            var code = weather.find("code").text();
            switch (code) {
                case 'T E': self.weatherImg = 'img/berry-dragon.jpg'; break;
                case 'NMR': self.weatherImg = 'img/zen.jpg'; break;
                case 'HVA': self.weatherImg = 'img/rain.jpg'; break;
                case 'SRO': self.weatherImg = 'img/sro.jpg'; break;
            }
        });
    });
});
