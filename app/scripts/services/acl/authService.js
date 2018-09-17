/**
 * Authenticate Users
 * Migrated from personal project
 * James Van Leuven
 * Created: 2013-11-22
 * Migrated: 2018-04-04
 *
 * Check user authentication
 * works in conjunction with the 
 * JWT.js decryption service
 */

angular
    .module('App.authServices', [])
    .factory('AuthenticationService', function($rootScope, $window){
        'use strict';
        var auth;

        if(!$window.sessionStorage.token){
            auth = { isLogged: false };
        }

        if($window.sessionStorage.token){
            auth = { isLogged: true };
        }

        $rootScope.auth = auth;
    
        console.log('isLogged', auth);

        return auth;
})
.factory('authInterceptor', function ($rootScope, $q, $window) {
    
    return {
            request: function (config) {

                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token; 
                    config.headers.useXDomain = true;
                    config.headers.withCredentials = true;
                }

                // console.log('authInterceptor Request', config );
                
                return config;
            },

            response: function (response) {
                
                if (response.status === 401) {
                    console.log('Not Logged On');

                    // handle the case where the user is not authenticated
                }
                
                //console.log('authInterceptor Response: ', response );

                return response || $q.when(response);
            }
    };
})
.config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
});