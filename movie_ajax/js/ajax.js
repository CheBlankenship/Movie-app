var app = angular.module('movie', []);

app.factory('Movie', function factoryFunction($http) {
  var service = {};
  service.nowPlaying = function() {
    return $http({
      url: 'http://api.themoviedb.org/3/movie/now_playing',
      params: {api_key: '817abffdbdf69f964d627f129a675081'}
    });
  };

  service.details = function(movieId) {
    return $http({
      url: 'http://api.themoviedb.org/3/movie/' + movieId,
      params: {api_key: '817abffdbdf69f964d627f129a675081'}
    });
  };

  service.search = function(query) {
    return $http({
      url: 'http://api.themoviedb.org/3/search/movie' ,
      params: {api_key: '817abffdbdf69f964d627f129a675081',
              query: query}
    });
  };
  return service;
});


app.controller('MovieController', function($scope, Movie) {
  $scope.getNowPlaying = function() {
    Movie.nowPlaying().success(function(results) {
      $scope.results = results.results;
      console.log(results);
    });
  };

  $scope.getDetails = function() {
    Movie.details($scope.movieId).success(function(details) {
      $scope.details = details;
      console.log(details);
    });
  };

  $scope.search = function() {
    Movie.search($scope.query).success(function(search) {
      $scope.searchResult = search.results;
      console.log($scope.searchResult);
    });
  };
});
