new Vue({
    el: '#app',
    data: {
        sound: {
            break: new Audio("mp3/manager.mp3"),
            work: new Audio("mp3/Despacito.mp3"),
        },
        results: {
            whatIDoNow: '---',
            sessionsToday: 0,
        },
        settings: {
            title: {
                showIt: 'Show Settings',
                hideIt: 'Hide Settings'
            },

            // status: false,
            status: true, // отладочное для настроек
            
            flow: {
                work: {
                    length: 1000*1,
                },
                break: {
                    length: 1000*1,
                },
                session: {
                    numRounds: 2,
                }
            },
        },
    },

    methods: {
        /**
         * PLAY AND STOP
         */
        startWork() {
            this.results.whatIDoNow = 'work';
            this.pauseAllSounds();
            setTimeout(this.startWorkTimeout, this.settings.flow.work.length);
        },
        startWorkTimeout() {
            this.sound.break.play();
            this.results.whatIDoNow = 'trying to stop working'
        },
        startBreak() {
            this.results.whatIDoNow = 'break';
            this.pauseAllSounds();

            setTimeout(this.startBreakTimeout, this.settings.flow.break.length);
        },
        startBreakTimeout() {
            this.results.whatIDoNow = 'start working'
            this.sound.work.play();
        },
        stopItAll() {
            this.results.whatIDoNow = '---';
            this.pauseAllSounds();
        },
        pauseAllSounds() {
            this.sound.break.pause();
            this.sound.break.currentTime = 0;
            this.sound.work.pause();
            this.sound.work.currentTime = 0;
        },

        /**
         * SETTINGS
         */
        changeSettingsStatus() {
            this.settings.status = !this.settings.status;
        },
        SaveWorkLength() {
            alert('need localStorage');
            // localStorage.WorkLength = this.settings.flow.work.length;
        }
    },


    computed: {
        settingsTopButtonTitle() {
            return 'Top Button';
            // return this.settings.status ? this.settings.title.hideIt : this.settings.title.showIt;
        }
    },
    
    
    mounted: function() {
        // взять данные из настроек в локалСторадж
        // предупредить о куках сначала, потом записать в локалСторадже их наличие
        // alert('need localStorage');
        // this.settings.flow.work.length = localStorage.WorkLength ?? this.settings.flow.work.length;
    }
});