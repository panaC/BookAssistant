import { Connection } from 'mongoose';
import { WebpubSchema } from './schema/webpub.schema';
import { WEBPUB_MODEL_PROVIDER, DB_PROVIDER } from '../constants';

export const webpubProviders = [
    {
        provide: WEBPUB_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model('Webpub', WebpubSchema),
        inject: [DB_PROVIDER],
    },
];
