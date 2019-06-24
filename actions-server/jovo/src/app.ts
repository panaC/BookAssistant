import {alexaHandler} from './alexa/handler';
import {googleHandler} from './google/handler';
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
        if (!this.$user.$data.book) {
            this.$user.$data.book = {};
        }
        this.$speech.addT('welcome.new_user.1')
            .addBreak('300ms')
            .addT('welcome.new_user.2')
            .addBreak('500ms')
            .addT('welcome.new_user.3');

        return this.toIntent('startIntent');
    },

    LAUNCH() {
        if (!this.$user.$data.book) {
            this.$user.$data.book = {};
        }
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
        console.log(this.$inputs.title);
        if (this.$inputs.title) {
                this.$session.$data.title = this.$inputs.title.key;
                this.followUpState('LISTEN');
                return this.toIntent('listenGetBookIntent');
        } else {
            this.ask(this.t('listen.help.1'));
        }
    },

    LISTEN: {
        async 'listenGetBookIntent'() {
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
                    return this.toIntent('listenPlayIntent');
                } else {
                    this.ask(this.t('listen.not_found', {title: this.$session.$data.title}));
                }
            } catch(e) {
                console.error('listenGetBookIntent', e);
                this.tell(this.t('listen.error'));
            }
        },

        
        'LISTEN.LISTBOOK': {
            async 'listenListbookChooseBookIntent'() {
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
                    return this.toIntent('listenPlayIntent');
                }
            },
        },

        'listenPlayIntent'() {
            try {
                const data = this.$user.$data.book[this.$session.$data.bookId] as IbookData;
                const link: Ilinks = data.manifest.readingOrder[data.currentTrack];

                this.followUpState('LISTEN');
                this.$speech.addText(' ');
                if (this.$alexaSkill && this.$alexaSkill.$audioPlayer) {
                    this.$alexaSkill.$audioPlayer
                        .setOffsetInMilliseconds(0)
                        .play(link.href, link.title || link.rel)
                        .tell(this.$speech);
                } else if (this.$googleAction && this.$googleAction.$mediaResponse) {
                    this.$googleAction.$mediaResponse.play(link.href, link.title || link.rel);
                    this.$googleAction.showSuggestionChips([...this.t('listen.play.prev'), ...this.t('listen.play.next')]);
                    this.ask(this.$speech);
                }
            } catch (e) {
                this.tell(this.t('listen.play.error'));
            }
        },

        
    },

    'listenResumeIntent'() {
        try {
            const data = this.$user.$data.book[this.$session.$data.bookId] as IbookData;
            const link = data.manifest.readingOrder[data.currentTrack];

            this.followUpState('LISTEN');
            this.$speech.addText(' ');
            if (this.$alexaSkill && this.$alexaSkill.$audioPlayer) {
                const offset = data.currentOffset;
                this.$alexaSkill.$audioPlayer
                    .setOffsetInMilliseconds(offset)
                    .play(link.href, link.title || link.rel)
                    .tell(this.$speech);
            } else if (this.$googleAction && this.$googleAction.$mediaResponse) {
                this.$googleAction.$mediaResponse.play(link.href, link.title || link.rel);
                this.$googleAction.showSuggestionChips([...this.t('listen.play.prev'), ...this.t('listen.play.next')]);
                this.ask(this.$speech);
            }

        } catch (e) {
            this.tell(this.t('listen.play.error'));
        }
    },

});

app.setAlexaHandler(alexaHandler);
app.setGoogleAssistantHandler(googleHandler);
