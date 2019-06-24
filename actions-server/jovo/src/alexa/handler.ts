import { IbookData } from './../interface/book.interface';
import {Handler} from 'jovo-core';

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
                try {
                    this.followUpState('LISTEN');
                    const data = this.$user.$data.book[this.$session.$data.bookId] as IbookData;
                    if (data && this.$alexaSkill && this.$alexaSkill.$audioPlayer) {
                        const link = data.manifest.readingOrder[data.currentTrack];
                        this.$alexaSkill.$audioPlayer.setExpectedPreviousToken(link.title || link.rel);
                        ++data.currentTrack;
                        data.currentOffset = 0;
                        this.$alexaSkill.$audioPlayer.enqueue(link.href, link.title);
                    }

                } catch (e) {
                    this.tell(this.t('listen.play.error'));
                }
            },

            'AlexaSkill.PlaybackFinished'() {
                try {
                    this.followUpState('LISTEN');
                    const data = this.$user.$data.book[this.$session.$data.bookId] as IbookData;
                    if (data.currentTrack < data.manifest.readingOrder.length) {
                        ++data.currentTrack;
                        data.currentOffset = 0;
                    }
                    
                } catch (e) {
                    this.tell(this.t('listen.play.error'));
                }
            },

            'AlexaSkill.PlaybackStopped'() {
                try {
                    const data = this.$user.$data.book[this.$session.$data.bookId] as IbookData;
                    if (this.$alexaSkill && this.$alexaSkill.$audioPlayer) {
                        data.currentOffset = this.$alexaSkill.$audioPlayer.getOffsetInMilliseconds();
                    }
                    
                } catch (e) {
                    this.tell(this.t('listen.play.error'));
                }
            },

            'AlexaSkill.PlaybackFailed'() {

            },
        },
    };
