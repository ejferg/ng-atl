atl.factory('config', function(){
    
    return {
        firebaseUrl: 'https://ngatl.firebaseio.com/',
        serviceUrl: 'http://beta.svc.mshp.dj\\:8080',
        soundPackUrl: 'https://s3.amazonaws.com/sp.mshp.dj/%s/',
        songUrl: 'https://s3.amazonaws.com/songs.mshp.dj/%s.m4a'
    }
});