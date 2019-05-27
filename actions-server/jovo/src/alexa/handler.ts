import {Handler} from 'jovo-core';
import {Player} from '../player';

export const alexaHandler: Handler =
    {
        'AMAZON.CancelIntent'() {
            this.tell('Alright, see you next time!');
        },

        'AMAZON.PauseIntent'() {
            if (this.$alexaSkill && this.$alexaSkill.$audioPlayer) {
                this.$alexaSkill.$audioPlayer.stop();
            }
        },

        'AMAZON.LoopOffIntent'() {
            this.tell('Not implemented');
        },

        'AMAZON.LoopOnIntent'() {
            this.tell('Not implemented');
        },

        'AMAZON.RepeatIntent'() {
            this.tell('Not implemented');
        },

        'AMAZON.ShuffleOffIntent'() {
            this.tell('Not implemented');
        },

        'AMAZON.ShuffleOnIntent'() {
            this.tell('Not implemented');
        },

        'AMAZON.StartOverIntent'() {
            this.tell('Not implemented');
        },

        AUDIOPLAYER: {
            'AlexaSkill.PlaybackStarted'() {

            },

            'AlexaSkill.PlaybackNearlyFinished'() {
                let currentIndex = this.$user.$data.currentIndex;
                let episode = Player.getNextEpisode(currentIndex);
                let nextIndex = Player.getEpisodeIndex(episode);
                if (episode && this.$alexaSkill && this.$alexaSkill.$audioPlayer) {
                    this.$alexaSkill.$audioPlayer.setExpectedPreviousToken(`${currentIndex}`).enqueue(episode.url, `${nextIndex}`);
                }
            },

            'AlexaSkill.PlaybackFinished'() {
                let currentIndex = this.$user.$data.currentIndex;
                if (currentIndex > 0) {
                    this.$user.$data.currentIndex = currentIndex - 1;
                }
            },

            'AlexaSkill.PlaybackStopped'() {
                if (this.$alexaSkill && this.$alexaSkill.$audioPlayer) {
                    this.$user.$data.offset = this.$alexaSkill.$audioPlayer.getOffsetInMilliseconds();
                }
            },

            'AlexaSkill.PlaybackFailed'() {

            },
        },
    };
