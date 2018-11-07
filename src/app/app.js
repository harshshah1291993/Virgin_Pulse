import angular from 'angular';
import Chart from 'angular-chart.js';
require("angular-route");

import '../style/app.scss';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ngRoute', Chart])
  .controller('AppCtrl', function ($scope) {
    // Home page controller
    $scope.labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $scope.series = ['Last Week Steps', 'This Week Steps'];
    var thisWeek = [];
    var lastWeek = [];
    var randomInt = function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min))
    };
    for (var i=0;i<$scope.labels.length;i++) {
      thisWeek.push(randomInt(1000, 20000));
    }
    for (var i=0;i<$scope.labels.length;i++) {
      lastWeek.push(randomInt(1000, 20000));
    }
    $scope.data = [
      lastWeek,
      thisWeek
    ];
  })
  .controller('LeaderboardCtrl', function ($scope, $http) {
    // Leaderboard controller
    $http({
      method: 'GET',
      url: 'https://randomuser.me/api/?results=10'
    }).then(function successCallback(response) {
      $scope.users = response.data.results.map(user => {
        user.steps = randomInt(1000, 20000);
        return user;
      });
    }, function errorCallback(response) {
      console.log('api call error');
    });

    var randomInt = function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min))
    }
  })
  .controller('FriendsCtrl', function ($scope, $http) {
    $http({
      method: 'GET',
      url: 'https://randomuser.me/api/?results=4'
    }).then(function successCallback(response) {
        $scope.users = response.data.results.map(user => {
        return user;
      });
    }, function errorCallback(response) {
      console.log('api call error');
    });

    $http({
      method: 'GET',
      url: 'https://randomuser.me/api/?results=4'
    }).then(function successCallback(response) {
        $scope.friends = response.data.results.map(user => {
        return user;
      });
    }, function errorCallback(response) {
      console.log('api call error');
    });

    // handle change of button title on click
    $scope.title = "Send Friend Request";
    $scope.sendFriendRequest = function (index) {
      var user = $scope.users[index];
      user.requestSent = "Friend Request Sent";
      user.disabled = true;
    };
  })
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        template: require('./home.html'),
        controller: 'AppCtrl'
      })
      .when('/leaderboard', {
        template: require('./leaderboard.html'),
        controller: 'LeaderboardCtrl'
      })
      .when('/friends', {
        template: require('./friends.html'),
        controller: 'FriendsCtrl'
      });
    $locationProvider.hashPrefix('');
  });

export default MODULE_NAME;
