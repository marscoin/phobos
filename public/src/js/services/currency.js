'use strict';

angular.module('insight.currency').factory('Currency', function($resource, $rootScope) {
    // Define the resource with custom get method
      return $resource('/api/currency', {}, {
        get: { method: 'GET' }  // Explicitly define the 'get' method
    });
});
