import { IbookData } from './../interface/book.interface';
import {Handler} from 'jovo-core';

export const googleHandler: Handler = {
    AUDIOPLAYER: {
        'GoogleAction.Finished'() {
            try {
                const data = this.$user.$data.book[this.$session.$data.bookId] as IbookData;
                ++data.currentTrack;
                data.currentOffset = 0;

                this.followUpState('LISTEN');
                this.toIntent('listenPlayIntent');
            } catch (e) {
                this.tell(this.t('listen.play.error'));
            }
        },
    },
};
