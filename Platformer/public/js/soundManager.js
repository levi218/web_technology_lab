function BufferLoader(manager, context, urlList, callback) {
    this.manager = manager
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function (url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function () {
        // Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(
            request.response,
            function (buffer) {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                loader.bufferList[index] = buffer;
                if (++loader.loadCount == loader.urlList.length)
                    loader.onload(loader.bufferList);
            },
            function (error) {
                console.error('decodeAudioData error', error);
            }
        );
    }

    request.onerror = function () {
        alert('BufferLoader: XHR error');
    }

    request.send();
}

BufferLoader.prototype.load = function () {
    for (var i = 0; i < this.urlList.length; ++i)
        this.loadBuffer(this.urlList[i], i);
}

var soundManager = {
    settings: {
        bgVolume: 0.5,
        effectVolume: 0.5
    },
    context: null,
    bufferLoader: null,
    init: function () {
        this.context = new AudioContext();

        this.bufferLoader = new BufferLoader(
            this,
            this.context,
            [
                '/jump.wav',
                '/bg_music.mp3',
            ],
            this.finishedLoading
        );
        this.bufferLoader.load();
    },
    finishedLoading: function (bufferList) {
        console.log(this)
        this.manager.buffer_bg = bufferList[1];
        this.manager.buffer_jump = bufferList[0];

        this.manager.loaded = true;
    },
    updateVolumeBg: function (value) {
        this.settings.bgVolume = value;
        if(this.gain_bg)
            this.gain_bg.gain.value = value;
        this.saveSettings();
    },
    updateVolumeEffect: function (value) {
        this.settings.effectVolume = value;
        this.saveSettings();
    },
    saveSettings: function () {
        localStorage.setItem("soundSettings", JSON.stringify(this.settings))
    },
    playBgMusic: function () {
        if (this.loaded && !this.bg_playing) {
            var source = this.context.createBufferSource();
            source.buffer = this.buffer_bg;

            var gainNode = this.context.createGain();
            source.connect(gainNode);
            gainNode.connect(this.context.destination);
            gainNode.gain.value = this.settings.bgVolume;
            this.gain_bg = gainNode;
            source.loop = true;
            source.start(0);

            this.bg_playing = true;
        }
    },
    playJumpSound: function () {
        if (this.loaded) {
            var source = this.context.createBufferSource();
            source.buffer = this.buffer_jump;

            var gainNode = this.context.createGain();
            gainNode.gain.value = this.settings.effectVolume;
            source.connect(gainNode);
            gainNode.connect(this.context.destination);

            source.start(0);
        }
    }
}

//Load settings
let soundSettings = localStorage.getItem("soundSettings");
if (soundSettings != null) {
    soundManager.settings = JSON.parse(soundSettings);
    soundManager.settings.bgVolume = parseFloat(soundManager.settings.bgVolume)
    soundManager.settings.effectVolume = parseFloat(soundManager.settings.effectVolume)
}