angular.module('insight.system').factory('InitLoadService', function() {
    var service = {
      firstLoad: true
    };
    return service;
  });