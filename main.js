var app = angular.module('tracker', []);

app.controller('mapController', function() {
    angular.element(document).ready(function () {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
    });
});

app.controller('parcelController',['$interval', '$http', function($interval, $http) {
    var store = this;
    store.parcels = [];
    store.api_count = 0;

    this.update_parcels = function() {
        var req = $http.get('http://zoomcar-ui.0x10.info/api/courier?type=json&query=list_parcel')
        .success(function(data) {
            store.parcels = data.parcels;
        });
    };

    this.check_api_hits = function() {
        var req = $http.get('http://zoomcar-ui.0x10.info/api/courier?type=json&query=api_hits')
        .success(function(data) {
            store.api_count = data.api_hits;
        });
    };

    $interval(this.check_api_hits, 1000);
    $interval(this.update_parcels, 1000);
}]);
