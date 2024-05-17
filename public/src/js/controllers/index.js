'use strict';

var TRANSACTION_DISPLAYED = 20;
var BLOCKS_DISPLAYED = 6;

angular.module('insight.system').controller('IndexController',
  function($scope, $rootScope, $timeout, Global, getSocket, Blocks, InitLoadService) {
    $scope.global = Global;

    var _getBlocks = function() {
      if (InitLoadService.firstLoad) {
        Blocks.get({
          limit: BLOCKS_DISPLAYED
        }, function(res) {
          $scope.blocks = res.blocks;
          $scope.blocksLength = res.length;
          InitLoadService.firstLoad = false; // Update the flag after the first load
        });
      }
    };


    var socket = getSocket($scope);

    var _startSocket = function() { 
      socket.emit('subscribe', 'inv');
      socket.on('tx', function(tx) {
        $scope.txs.unshift(tx);
        if (parseInt($scope.txs.length, 10) >= parseInt(TRANSACTION_DISPLAYED, 10)) {
          $scope.txs = $scope.txs.splice(0, TRANSACTION_DISPLAYED);
        }
      });

      // Updated handling for new blocks
      socket.on('block', function(block) {
        $timeout(function() {
          $scope.blocks.unshift(block);
          if ($scope.blocks.length > BLOCKS_DISPLAYED) {
            $scope.blocks.pop(); // Ensure the array doesn't exceed the display limit
          }
        });
      });
    };

    socket.on('connect', function() {
      _startSocket();
    });

    $scope.humanSince = function(time) {
      var m = moment.unix(time);
      return m.max().fromNow();
    };

    $scope.index = function() {
      _getBlocks();
      _startSocket();
    };

    $scope.txs = [];
    $scope.blocks = [];
  });