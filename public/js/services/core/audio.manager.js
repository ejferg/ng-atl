atl.factory('audioManager', 
    ['$rootScope', '$log', '$window', 
    function ($rootScope, $log, $window) {

		var _isPlaying = false;
		var _isReady = false;

		var sm = $window.soundManager;
		var playqueue = [];
		var currentItemIndex = -1;

		var SOUND_MANAGER_URL = '../lib/soundmanager/swf/';

		var startPlayback = function() {

			stopPlayback();

			var items = [];
			var queueItem;
			var count = playqueue.length;

			angular.forEach(playqueue, function(queueItem){

				sm.createSound({id: queueItem.itemID, url: queueItem.itemURL});

			});

			currentItemIndex = 0;

			if(_isReady) {

				var currentItem = currentPlaybackItem();
				playItem(currentItem);
			}
		};

		var playItem = function(item) {

			sm.play(item.itemID, {onfinish: onPlayItemFinished});
			_isPlaying = true;

			if(item) {
				$rootScope.$broadcast('startedPlaying', item);
			}
		};

		var stopPlayback = function() {

			sm.stop();
			removeAllItems();

			var item = currentPlaybackItem();

			if (item) {

				$rootScope.$broadcast('stoppedPlaying', item);
			}

			currentItemIndex = -1;
			_isPlaying = false;
		};

		var pausePlayback = function(disableEvent) {

			_isPlaying = false;

			var item = currentPlaybackItem();

			if(item) {
                sm.pause(item.itemID);
                
                // if(!disableEvent)
				    $rootScope.$broadcast('pausedPlaying', item);
			}
		};

		var resumePlayback = function(disableEvent) {

			
			_isPlaying = true;

			var item = currentPlaybackItem();

			if(item) {
                sm.resume(item.itemID);
                
                // if(!disableEvent)
				    $rootScope.$broadcast('startedPlaying', item);
			}
		};

		var advanceToNextItem = function() {

			if (currentItemIndex > -1 && currentItemIndex + 1 < playqueue.length) {

				var lastItem = playqueue[currentItemIndex];

				$rootScope.$broadcast('stoppedPlaying', lastItem);

				currentItemIndex++;

				var nextItem = playqueue[currentItemIndex];
				sm.play(nextItem.itemID, {onfinish: onPlayItemFinished});

				$rootScope.$broadcast('startedPlaying', nextItem);
			}
			else {

				if (!_isPlaying) {

					currentItemIndex = -1;
				}
			}
		};

		var clearQueue = function() {
			stopPlayback();
			playqueue = [];
		};

		var addPlaybackItemsToQueue = function(playbackItems) {

			angular.forEach(playbackItems, function(value){
				playqueue.push(value);
			});
		};

		var addPlaybackItemToQueue = function(playbackItem) {
			playqueue.push(playbackItem);
		};

		var setPlaybackQueue = function(playbackItems) {
			clearQueue();
			playqueue = playbackItems;
		};

		var currentPlaybackItem = function() {
			var returnItem;

			if(playqueue.length > currentItemIndex) {
				returnItem = playqueue[currentItemIndex];
			}

			return returnItem;
		};

		var isPlaying = function() {
			return _isPlaying;
		};

		var removeAllItems = function() {

			angular.forEach(playqueue, function(value){
				sm.destroySound(value.itemID);
			});
		};

		var onPlayItemFinished = function(e) {

			advanceToNextItem();
		};

		var onReady = function() {

			_isReady = true;

			$log.log('ready');

			if(currentItemIndex == 0) {
				var currentItem = currentPlaybackItem();
				playItem(currentItem);
			}
		};



		//fail init if mp4 is not supported? disable mp3?
		sm.audioFormats.mp4.required = true;

		sm.setup({
			url: SOUND_MANAGER_URL,
			onready: onReady,
			debugMode: false,
			useFlashBlock: false,
			defaultOptions: {
				autoLoad: true,
				autoPlay: false
			}
		});

		return {
			startPlayback: startPlayback,
			stopPlayback: stopPlayback,
            pausePlayback: pausePlayback,
            resumePlayback: resumePlayback,
			setPlaybackQueue: setPlaybackQueue,
			isPlaying: isPlaying
		};
}]);
