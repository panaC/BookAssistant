import {alexaHandler} from './alexa/handler';
import {googleHandler} from './google/handler';
import {Player} from './player';
import {App} from 'jovo-framework';
import {Alexa} from 'jovo-platform-alexa';
import {JovoDebugger} from 'jovo-plugin-debugger';
import {FileDb} from 'jovo-db-filedb';
import {GoogleAssistant} from 'jovo-platform-googleassistant';
import axios from 'axios';
import { Iwebpub } from './interface/webpub.interface';
import { IbookData } from './interface/book.interface';
import { Ilinks } from './interface/links.interface';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

export const app = new App({});

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    NEW_USER() {
        this.$speech.addT('welcome.new_user.1')
            .addBreak('300ms')
            .addT('welcome.new_user.2')
            .addBreak('500ms')
            .addT('welcome.new_user.3');

        return this.toIntent('startIntent');
    },

    LAUNCH() {
        this.$speech.addT('welcome.launch.1')
            .addBreak('300ms')
            .addT('welcome.launch.2')
            .addBreak('500ms')
            .addT('welcome.launch.3');

        return this.toIntent('startIntent');
    },

    startIntent() {
        return this.ask(this.$speech, this.t('welcome.launch.3'));
    },

    END() {
        this.tell(this.t('control.end'));
    },

    ON_ERROR() {
        this.tell(this.t('control.error'));
    },

    Unhandled() {
        this.ask(this.t('control.fallback'));
    },

    CancelIntent() {
        this.tell('cancel intent');
    },

    ON_REQUEST() {
        console.info(`${this.isAlexaSkill ? 'ALEXA: ' : 'ACTIONS: '}`);
    },

    HelpIntent() {
        this.ask(this.t('control.help'));
    },

    async listenIntent() {
        if (this.$inputs.title) {
                this.$session.$data.title = this.$inputs.title.key;
                this.followUpState('LISTEN');
                await this.toIntent('listen.getBookIntent');
        } else {
            this.ask(this.t('listen.help.1'));
        }
    },

    LISTEN: {
        async 'listen.getBookIntent'() {
            try {
                let search = (await axios
                    .get<Iwebpub[]>(this.t('constant.opds-server', {query: this.$session.$data.title}) as string)).data;
                if (search.length > 1) {
                    this.followUpState('LISTEN_LISTBOOK');
                    search = search.slice(0, 4);
                    search.map((v, i) => {
                        this.$speech.addSayAsOrdinal(i + 1)
                            .addT('listen.not_found', {title: v.metadata.title, author: v.metadata.author})
                            .addBreak('300ms');
                    });
                } else if (search.length === 1) {
                    this.followUpState('LISTEN');
                    this.$session.$data.bookId = search[0].metadata.identifier;
                    if (this.$user.$data.book[search[0].metadata.identifier]) {
                        this.$user.$data.book[search[0].metadata.identifier].manifest = search[0];
                    } else {
                        this.$user.$data.book[search[0].metadata.identifier] = {
                            manifest: search[0],
                            currentTrack: 0,
                        };
                    }
                    await this.toIntent('listen.playIntent');
                } else {
                    this.tell(this.t('listen.not_found', {title: this.$session.$data.title}));
                }
            } catch(e) {
                this.tell('listen.error');
            }
        },

        
        'LISTEN.LISTBOOK': {
            async 'listen.listbook.listenchooseBookIntent'() {
                const ordinal = this.$inputs.ordinal;
                const search = (await axios
                    .get<Iwebpub[]>(this.t('constant.opds-server', {query: this.$session.$data.title}) as string)).data;
                if (search[Number(ordinal) - 1]) {
                    const book = search[Number(ordinal) - 1];
                    this.$session.$data.bookId = book.metadata.identifier;
                    if (this.$user.$data.book[book.metadata.identifier]) { 
                        this.$user.$data.book[book.metadata.identifier].manifest = book;
                    } else {
                        this.$user.$data.book[book.metadata.identifier] = {
                            manifest: book,
                            currentTrack: 0,
                        };
                    }
                    this.followUpState('LISTEN');
                    await this.toIntent('listen.playIntent');
                }
            },
        },

        'listen.playIntent'() {
            try {
                const data = this.$user.$data.book[this.$session.$data.book] as IbookData;
                const link: Ilinks = data.manifest.readingOrder[data.currentTrack];

                this.$speech.addText(' ');
                if (this.$alexaSkill && this.$alexaSkill.$audioPlayer) {
                    this.$alexaSkill.$audioPlayer
                        .setOffsetInMilliseconds(0)
                        .play(link.href, link.title)
                        .tell(this.$speech);
                } else if (this.$googleAction && this.$googleAction.$mediaResponse) {
                    this.$googleAction.$mediaResponse.play(link.href, link.title);
                    this.$googleAction.showSuggestionChips([...this.t('listen.play.prev'), ...this.t('listen.play.next')]);
                    this.ask(this.$speech);
                }
            } catch (e) {
                this.tell(this.t('listen.play.error'));
            }
        },
    },

    FirstEpisodeIntent() {
        let episode = Player.getFirstEpisode();
        let currentIndex = Player.getEpisodeIndex(episode);
        this.$user.$data.currentIndex = currentIndex;
        this.$speech.addText('Here is the first episode.');

        if (this.$alexaSkill && this.$alexaSkill.$audioPlayer) {
            this.$alexaSkill.$audioPlayer
                .setOffsetInMilliseconds(0)
                .play(episode.url, `${currentIndex}`)
                .tell(this.$speech);
        } else if (this.$googleAction && this.$googleAction.$mediaResponse) {
            this.$googleAction.$mediaResponse.play(episode.url, episode.title);
            this.$googleAction.showSuggestionChips(['pause', 'start over']);
            this.ask(this.$speech);
        }
    },

    LatestEpisodeIntent() {
        let episode = Player.getLatestEpisode();
        let currentIndex = Player.getEpisodeIndex(episode);
        this.$user.$data.currentIndex = currentIndex;
        this.$speech.addText('Here is the latest episode.');

        if (this.$alexaSkill && this.$alexaSkill.$audioPlayer) {
            this.$alexaSkill.$audioPlayer
                .setOffsetInMilliseconds(0)
                .play(episode.url, `${currentIndex}`)
                .tell(this.$speech);
        } else if (this.$googleAction && this.$googleAction.$mediaResponse) {
            this.$googleAction.$mediaResponse.play(episode.url, episode.title);
            this.$googleAction.showSuggestionChips(['pause', 'start over']);
            this.ask(this.$speech);
        }
    },

    ListIntent() {
        const indices = Player.getRandomIndices(4);
        this.$session.$data.episodeIndices = indices;

        this.$speech.addText('Here\'s a list of episodes: ');
        for (let i = 0; i < indices.length; i++) {
            let episode = Player.getEpisode(indices[i]);
            this.$speech.addSayAsOrdinal(i + 1)
                .addText(episode.title)
                .addBreak('100ms');
        }
        this.$speech.addText('Which one would you like to listen to?');
        this.ask(this.$speech);
    },

    ChooseFromListIntent() {
        const ordinal = this.$inputs.ordinal;
        let episodeIndices = this.$session.$data.episodeIndices;
        let episodeIndex = episodeIndices[Number(ordinal.key) - 1];
        this.$user.$data.currentIndex = episodeIndex;
        let episode = Player.getEpisode(episodeIndex);
        this.$speech.addText('Enjoy');

        if (this.$alexaSkill && this.$alexaSkill.$audioPlayer) {
            this.$alexaSkill.$audioPlayer
                .setOffsetInMilliseconds(0)
                .play(episode.url, `${episodeIndex}`)
                .tell(this.$speech);
        } else if (this.$googleAction && this.$googleAction.$mediaResponse) {
            this.$googleAction.$mediaResponse.play(episode.url, episode.title);
            this.$googleAction.showSuggestionChips(['pause', 'start over']);
            this.ask(this.$speech);
        }
    },

    ResumeIntent() {
        let currentIndex = this.$user.$data.currentIndex;
        let episode = Player.getEpisode(currentIndex);
        this.$speech.addText('Resuming your episode.');

        if (this.$alexaSkill && this.$alexaSkill.$audioPlayer) {
            let offset = this.$user.$data.offset;
            this.$alexaSkill.$audioPlayer
                .setOffsetInMilliseconds(offset)
                .play(episode.url, `${currentIndex}`)
                .tell(this.$speech);
        } else if (this.$googleAction && this.$googleAction.$mediaResponse) {
            this.$googleAction.$mediaResponse.play(episode.url, episode.title);
            this.$googleAction.showSuggestionChips(['pause', 'start over']);
            this.ask(this.$speech);
        }
    },

    NextIntent() {
        let currentIndex = this.$user.$data.currentIndex;
        let nextEpisode = Player.getNextEpisode(currentIndex);
        if (!nextEpisode) {
            return this.tell('That was the most recent episode. You have to wait until a new episode gets released.');
        }
        currentIndex = Player.getEpisodeIndex(nextEpisode);
        this.$user.$data.currentIndex = currentIndex;
        if (this.$alexaSkill && this.$alexaSkill.$audioPlayer) {
            this.$alexaSkill.$audioPlayer.setOffsetInMilliseconds(0).play(nextEpisode.url, `${currentIndex}`);
        } else if (this.$googleAction && this.$googleAction.$mediaResponse) {
            this.$googleAction.$mediaResponse.play(nextEpisode.url, nextEpisode.title);
            this.$googleAction.showSuggestionChips(['pause', 'start over']);
            this.ask('Enjoy');
        }
        return;
    },

    PreviousIntent() {
        let currentIndex = this.$user.$data.currentIndex;
        let previousEpisode = Player.getPreviousEpisode(currentIndex);
        if (!previousEpisode) {
            return this.tell('You are already at the oldest episode.');
        }
        currentIndex = Player.getEpisodeIndex(previousEpisode);
        this.$user.$data.currentIndex = currentIndex;
        if (this.$alexaSkill && this.$alexaSkill.$audioPlayer) {
            this.$alexaSkill.$audioPlayer.setOffsetInMilliseconds(0).play(previousEpisode.url, `${currentIndex}`);
        } else if (this.$googleAction && this.$googleAction.$mediaResponse) {
            this.$googleAction.$mediaResponse.play(previousEpisode.url, previousEpisode.title);
            this.$googleAction.showSuggestionChips(['pause', 'start over']);
            this.ask('Enjoy');
        }
        return;
    },

});

app.setAlexaHandler(alexaHandler);
app.setGoogleAssistantHandler(googleHandler);
