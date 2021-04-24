new Vue({
    el: '#app',
    data: {
        // stopSound: new Audio("mp3/Schtrauss_Bat.mp3"),
        stopSound: new Audio("mp3/cats/Flёur - Теплые коты.mp3"),
        volume: {
            max: 0.5,
            min: 0.01,
            step: 0.005
        }
    },
    methods: {
        stopMe()  { this.stopSound.play(); },
        okStoppingMe() { this.stopSound.pause(); },
        
        maximizeStopSound() {
            // this.stopSound.volume *= 2;
        },
        minimizeStopSound() {
            if (this.stopSound.volume > this.volume.min) {
                this.stopSound.volume -= this.volume.step;
                setTimeout(this.minimizeStopSound, 100);
            } else this.okStoppingMe();
        }

    },
    
    mounted: function() {
        this.stopSound.volume = this.volume.max;
        this.stopMe();
        this.minimizeStopSound();
    }
});