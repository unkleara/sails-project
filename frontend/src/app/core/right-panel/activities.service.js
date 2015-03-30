(function() {
   'use strict';

// Create the Socket.io wrapper service
   angular.module('core').service('activities', ['Socket', 'auth', '$state',
       function(Socket, auth, $state) {

         var activities = {
           data: []
         };

         Socket.get('/activity', function(data) {
             activities.data = data;
         });

         Socket.on('activity', function(event) {
           console.log('activity');
           console.log(event);
           activities.data.push(event.data);
         });

         return activities;
       }
   ]);

}());
