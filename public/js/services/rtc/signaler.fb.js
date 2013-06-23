atl.factory('signaler', 
    ['$rootScope', '$window', '$log', '$q', 'util', 'config', 
    function($rootScope, $window, $log, $q, util, config) {

           var SIGNALING_SERVER = '/';
           
           var socket, channel, 
               sender, messageHandler;
               
           var FB = $window.Firebase;
        
           var connect = function(options) {
               
               $log.log('Signaler:: connect :: token ::' + options.token);
               
               var deferred = $q.defer();
              
               sender = options.token;
               channel = options.channel;
               messageHandler = options.onMessage;
               
               socket = new FB(config.firebaseUrl + channel);
               
               socket.once('value', function(data) {
                   data = data.val();
                   
                   return $rootScope.$apply(function() {
                        return deferred.resolve(data);
                    });
                   
               }, this);
               
               socket.channel = channel;
               
               // if (channel != self.channel) {
               //    socket.onDisconnect().remove(); 
               // }       
            
               socket.on('child_added', onMessage);
               
               return deferred.promise;
           };
                
           var send = function(type, msg, action) {
               
               $log.log('Signaler:: send ::');
               $log.log(msg);
               
               if(action == 'sdp') {
                   
                   var parts = util.toMultiPartSDP(msg);
                   
                   angular.forEach(parts, function(part) {
                       
                       var data = {};
                       data[part.name] = part.value;
                       
                       send(type, data);
                   });
                   
               }
               else if(action == 'set') {
                   
                   socket.child(msg.name).set(msg.value);
               }
               else {
                   
                   type = type || 'default';
                   
                   var data = {
                       type: type,
                       sender: sender,
                       data: msg
                   }
                   
                   socket.push(data);
               }
               
           };
           
           var onMessage = function(msg) {
               
               $log.log('Signaler:: message received ::');
               
               var data = msg.val();
               
               if(!data) return;
               if(!data.hasOwnProperty('sender')) return;
               
               if(data.sender != sender) {
                   
                   $log.log('Signaler:: message received :: sender ' + data.sender);
                   
                   if(messageHandler) {
                       
                       messageHandler(data);
                   }
               }
           };
           
           return {
                
                connect: connect,
                send: send
            }
}]);