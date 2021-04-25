new Vue({
    el: '#app',
    data: {
        soundtrack: {
            break: new Audio("mp3/manager.mp3"),
            work: new Audio("mp3/Despacito.mp3"),
        },
        result: {
            whatIDoNow: '---',
            roundsToday: 0,
        },
        settings: {
            // show: false,
            show: true, // отладочное для настроек

            showHideBtnTitle: {
                showIt: 'Show Settings',
                hideIt: 'Hide Settings'
            },
            flow: {
                length: {
                    break: localStorage.lengthBreak ?? 1000*1,
                    work:  localStorage.lengthWork ?? 1000*1,
                },
                session: {
                    numRounds: 2,
                }
            },
        },
        eventLoopLength: 0,

        // test: 0,
    },

    methods: {
        /**
         * PLAY AND STOP
         */
        startWork() {
            this.result.whatIDoNow = 'work';
            this.pauseAllsoundtracks();
            setTimeout(this.stopWorkAsync, this.settings.flow.length.work);
            this.eventLoopLength++;
        },
        stopWorkAsync() {
            this.result.roundsToday++;
            this.result.whatIDoNow = 'trying to stop working';
            this.soundtrack.break.play();
            this.eventLoopLength--;
        },
        startBreak() {
            this.result.whatIDoNow = 'break';
            this.pauseAllsoundtracks();
            setTimeout(this.stopBreakAsync, this.settings.flow.length.break);
            this.eventLoopLength++;
        },
        stopBreakAsync() {
            this.result.whatIDoNow = 'start working'
            this.soundtrack.work.play();
            this.eventLoopLength--;
        },
        stopItAll() {
            this.result.whatIDoNow = '---';
            this.pauseAllsoundtracks();
            if (this.eventLoopLength > 0) location.reload();
        },
        pauseAllsoundtracks() {
            this.soundtrack.break.pause();
            this.soundtrack.work.pause();
            this.soundtrack.break.currentTime = 0;
            this.soundtrack.work.currentTime  = 0;
        },

        /**
         * SETTINGS
         */
        showHideSettings() {
            this.settings.show = !this.settings.show;
        },
        SaveWorkLength() {
            localStorage.lengthWork = this.settings.flow.length.work;
        },
        SaveBreakLength() {
            localStorage.lengthBreak = this.settings.flow.length.break;
        },
    },


    computed: {
        settingsTopButtonTitle() {
            return this.settings.show ? this.settings.showHideBtnTitle.hideIt : this.settings.showHideBtnTitle.showIt;
        },
    },
    

    mounted: function() {
        if (!localStorage.cookies) {
            alert('Cookies Ok?');
            localStorage.cookies = 'Ok';
        }
    }
});