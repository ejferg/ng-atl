atl.factory('signaler', 
    ['$rootScope', '$window', '$log', '$q', 'util', 
    function($rootScope, $window, $log, $q, util) {

   var SIGNALING_SERVER = '/';
   var socket, channel, 
       sender, messageHandler;
   var io = $window.io;

   var connect = function(options) {
       
       $log.log('Signaler:: connect :: token ::' + options.token);
       
       var deferred = $q.defer();
      
       sender = options.token;
       channel = options.channel;
       messageHandler = options.onMessage;
       
       io.connect(SIGNALING_SERVER).emit('new-channel', {
          channel: channel,
          sender : sender
       });
       
       socket = io.connect(SIGNALING_SERVER + channel);
       socket.channel = channel;

       socket.on('connect', function() {
           
           $log.log('Signaler:: connected ::');

           return $rootScope.$apply(function() {
               return deferred.resolve(socket);
           });
       });
    
       socket.on('message', onMessage);
       
       return deferred.promise;
   };
        
   var send = function(msg, type) {
       
       $log.log('Signaler:: send ::');
       $log.log(msg);
       
       if(type == 'sdj') {
           
           var parts = util.toMultiPartSDP(sdp);
           
           angular.forEach(parts, function(part){
               send(part);
           });
           
       } else {
           
           socket.emit('message', {
            sender: sender,
            data  : msg
        });
       }
       
   };
   
   var onMessage = function(data) {
       
       $log.log('Signaler:: message received ::');
       
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