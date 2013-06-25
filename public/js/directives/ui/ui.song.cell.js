atl.directive('atlSongCell', ['$log', 'config', function($log, config) {
    
    return {
        templateUrl: 'ui/song.cell.html',
        scope: {
            id: '=atlSongCell',
            soundPacks: '=atlSongCellSp',
            artist: '=atlSongCellArtist',
            title: '=atlSongCellTitle'
        },
        link: function(scope, elem, attrs) {
            
            var songUrl = _.str.sprintf(config.songUrl, scope.id);
            var albumArtUrl = _.str.sprintf(config.soundPackUrl + 'art-s.png', scope.soundPacks[0]._id);
            
            // Skin Parts
            var albumArt = elem.find('[skin-part="albumArt"]');
            var artistLabel = elem.find('[skin-part="artistLabel"]');
            var songLabel = elem.find('[skin-part="songLabel"]');
            
            
            albumArt.attr('src', albumArtUrl);
            artistLabel.text(scope.artist);
            songLabel.text(scope.title);
            
            elem.bind('click', function onClick (e) {
                
                var item = {
                    itemID: scope.id,
                    itemTitle: scope.title,
                    itemURL: songUrl,
                    onfinish: function(){}
                };
                
                scope.$emit('songSelected', item);
            });
        }
    }
}]);