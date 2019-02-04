import { Connection } from 'mongoose';
import { TicketSchema } from './schema/webpub.schema';
import { WEBPUB_MODEL_PROVIDER, DB_PROVIDER } from '../constants';

export const webpubProviders = [
    {
        provide: WEBPUB_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model('Webpub', TicketSchema),
        inject: [DB_PROVIDER],
    },
];
