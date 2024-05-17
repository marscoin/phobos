'use strict';

angular.module('insight.status').controller('StatusController',
  function($scope, $routeParams, $location, Global, Status, Sync, getSocket) {
    $scope.global = Global;

    $scope.getStatus = function(query) {
      Status.get({
          q: "get" + query
      }, function success(d) {
          $scope.loaded++;
          angular.extend($scope, d);
      }, function error(e) {
          $scope.error = "API ERROR: " + e.data;
      });
  };
    
    $scope.loadStatus = function() {
      $scope.loaded = 0;
      $scope.getStatus('BlockchainInfo');
      $scope.getStatus('NetworkInfo');
      $scope.getStatus('MiningInfo');
    };
    

    $scope.humanSince = function(time) {
      var m = moment.unix(time / 1000);
      return m.max().fromNow();
    };

    var _onSyncUpdate = function(sync) {
      $scope.sync = sync;
    };

    var _startSocket = function () {
      socket.emit('subscribe', 'sync');
      socket.on('status', function(sync) {
        _onSyncUpdate(sync);
      });
    };
    
    var socket = getSocket($scope);
    socket.on('connect', function() {
      _startSocket();
    });


    $scope.getSync = function() {
      _startSocket();
      Sync.get({},
        function(sync) {
          _onSyncUpdate(sync);
        },
        function(e) {
          var err = 'Could not get sync information' + e.toString();
          $scope.sync = {
            error: err
          };
        });
    };
  });