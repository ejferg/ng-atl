atl.directive('atlSongCell', ['$log', function($log) {
    
    return {
        templateUrl: 'ui/song.cell.html',
        scope: {
            soundPacks: '=atlSongCellSp',
            artist: '=atlSongCellArtist',
            title: '=atlSongCellTitle'
        },
        link: function(scope, elem, attrs) {
            
            var SP_URL = 'https://s3.amazonaws.com/sp.mshp.dj/%s/art-s.png';
            var albumArtUrl = _.str.sprintf(SP_URL, scope.soundPacks[0]._id);
            
            // Skin Parts
            var albumArt = elem.find('[skin-part="albumArt"]');
            var artistLabel = elem.find('[skin-part="artistLabel"]');
            var songLabel = elem.find('[skin-part="songLabel"]');
            
            
            albumArt.attr('src', albumArtUrl);
            artistLabel.text(scope.artist);
            songLabel.text(scope.title);
            
            elem.bind('click', function onClick (e) {
                
                scope.$emit('songSelected', scope);
            });
        }
    }
}]);