import * as mongoose from 'mongoose';
import { DB_PROVIDER, DB_URI } from '../constants';

export const databaseProviders = [
    {
        provide: DB_PROVIDER,
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;
            return await mongoose.connect(DB_URI);
        },
    },
];
