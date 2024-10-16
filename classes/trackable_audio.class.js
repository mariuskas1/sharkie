 

 class TrackableAudio extends Audio {

    static allAudioObjects = [];

    constructor(src) {
        super(src); 
        TrackableAudio.allAudioObjects.push(this); 
    }

}