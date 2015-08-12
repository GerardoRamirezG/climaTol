angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, Clima, Units, Cities, numDays) {

  //
    $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?cnt=" + numDays.get() + "&q=" + Cities.get() + "&lang=es&units=" + Units.get())
    .success(function (data){
      Clima.set(data.list);
      console.log(data.list);
      $scope.obUno = Clima.getItem();
      $scope.allChats = Clima.all();
      });

    $scope.doRefresh = function() {
    $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?cnt=" + numDays.get() + "&q=" + Cities.get() + "&lang=es&units=" + Units.get())
     .success(function(data) {
      Clima.set(data.list);
      $scope.obUno = Clima.getItem();
      $scope.allChats = Clima.all();
     })
     .finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
    }
})

.controller('ChatsCtrl', function($scope, $http, Clima) {
  $scope.chats = Clima.all();

  $scope.remove = function(chat) {
    Clima.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Clima) {
  $scope.obUno = Clima.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, Units, Cities, numDays) {
  
  $scope.UnitCelsius = function(){
      Units.set("metric");
  }
    $scope.UnitKelvin = function(){
      Units.set("kelvin");
  }
  $scope.UnitFaren = function(){
      Units.set("imperial");
  }

    $scope.tolucaCity = function(){
      Cities.set("toluca");
  }
    $scope.cancunCity = function(){
      Cities.set("cancun");
  }
  $scope.guadalajaraCity = function(){
      Cities.set("guadalajara");
  }
    $scope.threeDays = function(){
      numDays.set("3");
  }
    $scope.sevenDays = function(){
      numDays.set("7");
  }
  $scope.tenDays = function(){
      numDays.set("10");
  }


});
