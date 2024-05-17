'use strict';

angular.module('insight.fiat').factory('fiat', function($resource, $rootScope) {
    // Use the existing Currency $resource service if it's defined like this
    var Currency = $resource('/api/currency', {}, {
        get: { method: 'GET' }
    });

    var currencyData = {
        usdfactor: 0,
        fetched: false
    };

    function fetchCurrencyData() {
        if (!currencyData.fetched) {
            Currency.get({}, function(res) {
                var roundedPrice = parseFloat(res.data.price.toFixed(2));
                currencyData.usdfactor = roundedPrice;
                currencyData.fetched = true;
                $rootScope.currency = $rootScope.currency || {};
                $rootScope.currency.usdfactor = roundedPrice; // Make it globally available
            }, function(error) {
                console.error('Error fetching currency data:', error);
            });
        }
    }

    return {
        getCurrencyData: function() {
            if (!currencyData.fetched) {
                fetchCurrencyData();
            }
            return currencyData;
        }
    };
});
