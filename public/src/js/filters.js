'use strict';

angular.module('insight')
  .filter('startFrom', function() {
    return function(input, start) {
      start = +start; //parse to int
      return input.slice(start);
    }
  })
  .filter('split', function() {
    return function(input, delimiter) {
      var delimiter = delimiter || ',';
      return input.split(delimiter);
    }
  })
  .filter('formatVersion', function() {
    return function(version) {
        var major = Math.floor(version / 1000000);
        var minor = Math.floor((version % 1000000) / 10000); 
        return major + '.' + minor;
    };
  })
  .filter('formatGiga', function(){
    return function(hashrate){
      var oneGigahash = 1000000000;
      var gigahashes = hashrate / oneGigahash;
      return gigahashes.toFixed(2);
    }
  })
  .filter('round', function(){
    return function(input){
      return Math.round(input);
    }
  })
  .filter('round4', function(){
    return function(input){
      return parseFloat(input).toFixed(4);
    }
  })
  .filter('round6', function(){
    return function(input){
      return parseFloat(input).toFixed(4);
    }
  })
  .filter('calculatePercentage', function() {
    return function(byteSize) {
        const oneMBInBytes = 1024 * 1024; // 1MB
        return (byteSize / oneMBInBytes * 100).toFixed(2); // Convert bytes to % of 1MB and format to 2 decimal places
    };
  })
  .filter('numberFormat', function(){
    return function(input) {
      if (isNaN(input)) return input;
      var parts = input.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
  })
  .filter('poolImage', function() {
    const imageMap = {
      "Game.NET": "game_net.png",
      "WIN": "win.png",
      "0769": "0769.png",
      "MyPOOL": "mypool.png",
      "M4People": "m4people.png",
      "Zapto": "zapto.png",
      "Lucky": "lucky.png",
      "Zalmex": "zalmex.png",
      "Aika": "aika.png",
      "AsicEU": "asiceu.png"
    };

    return function(poolName) {
      return "images/" + (imageMap[poolName] || "default.png");
    };
  });

  