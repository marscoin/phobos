'use strict';

angular.module('insight.currency', ['insight.fiat']).controller('CurrencyController',
  function($scope, $rootScope, Currency, fiat) {
    $rootScope.currency.symbol = defaultCurrency;
    $rootScope.currency.usdfactor = 0.00;

    var _roundFloat = function(x, n) {
      if(!parseInt(n, 10) || !parseFloat(x)) n = 0;

      return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
    };

    if (!$rootScope.currency.fetched) {
      var data = fiat.getCurrencyData();
      $rootScope.currency.usdfactor = data.usdfactor;
      $rootScope.currency.fetched = data.fetched;
    }

    $rootScope.currency.getConvertion = function(value) {
      value = value * 1; // Convert to number

      if (!isNaN(value) && typeof value !== 'undefined' && value !== null) {
        if (value === 0.00000000) return '0 ' + this.symbol; // fix value to show

        var response;

        if (this.symbol === 'USD') {
          response = _roundFloat((value * this.factor), 2);
        } else if (this.symbol === 'MARS') {
          this.factor = 1;
          response = _roundFloat((value * this.factor), 8);        
        } else if (this.symbol === 'mMARS') {
          this.factor = 1000;
          response = _roundFloat((value * this.factor), 5);
        } else if (this.symbol === 'uMARS') {
          this.factor = 1000000;
          response = _roundFloat((value * this.factor), 2);
        } else {
          this.factor = 1;
          response = value;
        }
        // prevent sci notation
        if (response < 1e-7) response=response.toFixed(8);

        return response + ' ' + this.symbol;
      }

      return 'value error';
    };

    //getUSD
    $rootScope.currency.getUSDEquivalent = function(value) {
      value = parseFloat(value);
      if (!isNaN(value) && value !== null) {
        if (value === 0) return '0 USD';
        var response = _roundFloat(value * this.usdfactor, 2);
        return ' $'+response;
      }
      return 'value error';
    };
   

    $scope.setCurrency = function(currency) {
      $rootScope.currency.symbol = currency;
      localStorage.setItem('insight-currency', currency);

      if (currency === 'USD') {
        $rootScope.currency.factor = $rootScope.currency.usdfactor;
      } else if (currency === 'MARS') {
        $rootScope.currency.factor = 1;
      } else if (currency === 'mMARS') {
        $rootScope.currency.factor = 1000;
      } else if (currency === 'uMARS') {
        $rootScope.currency.factor = 1000000;
      } else {
        $rootScope.currency.factor = 1;
      }
    };

    // Get initial value
    Currency.get({}, function(res) {
      var roundedPrice = parseFloat(res.data.price.toFixed(2));
      $rootScope.currency.factor = $rootScope.currency.price = roundedPrice;
    });

    fiat.getCurrencyData();
  

  });