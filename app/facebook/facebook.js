'use strict';

angular.module('ngSocial.facebook', ['ngRoute', 'ngFacebook'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/facebook', {
        templateUrl: 'facebook/facebook.html',
        controller: 'FacebookCtrl'
    });
}])

.config(function ($facebookProvider) {
    $facebookProvider.setAppId('502432776604308');
    $facebookProvider.setPermissions("email, public_profile, user_posts, publish_actions, user_photos");
})

.run(function ($rootScope) {
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
})

.controller('FacebookCtrl', ['$scope', '$facebook', function ($scope, $facebook) {

    $scope.isLoggedIn = false;

    //Facebook Login Function
    $scope.login = function () {
        console.log("Logging in.....");
        $facebook.login().then(function () {
            $scope.isLoggedIn = true;
            console.log('LOGGED IN');
            refresh();
        });
    }

    //Facebook Logout Function
    $scope.logout = function () {
        console.log("Logging Out...");
        $scope.isLoggedIn = false;
        refresh();
    }

    //Facebook Refresh Function
    function refresh() {

        $facebook.api('/me').then(function (response) {
                $scope.welcomeMsg = "Welcome " + response.name;
                $scope.userInfo = response;
                $scope.isLoggedIn = true;
                console.log("Refresh function ran, screen values refreshed.");
            
            //Load Picture
                $facebook.api('/me/picture').then(function(response){
                    $scope.picture = response.data.url;
                    //Load Permissions
                    $facebook.api('/me/permissions').then(function(response){
                        $scope.permissions = response.data;
                        //Load Posts
                        $facebook.api('/me/posts').then(function(response){
                            $scope.posts = response.data;
                        })
                        
                    });
                })
                
            },
            function (err) {
                $scope.welcomeMsg = "Please Log In";
            });
        statusListener();

    }
    
    //Submit new Facebook Post
    $scope.postStatus = function(){
       var body = this.body;
        $facebook.api('/me/feed', 'post', {message: body}).then(function(res){
            $scope.msg = "Thanks for posting";
            refresh();
        })
        
    }

    function statusListener() {
        if ($scope.isLoggedIn == true) {


        } else {
            $scope.welcomeMsg = "Please Log In";
        }
    }
    //Call Refresh so screen always is up to date.
    refresh();


}]);