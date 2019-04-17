import {DialogflowConversation} from 'actions-on-google';

import {Inode} from '../middleware/graph';

import {Imiddleware} from './middleware.interface';
import {IsessionStorage, IuserStorage} from './storage.interface';

//
// overloading DialogflowConversation to add both user and session database
// access on couchdb
export interface IDFConv extends
    DialogflowConversation<IsessionStorage, IuserStorage> {
  middleware: Imiddleware;
  node: Inode;
  // empty here to add proprieties, go to Imiddleware
}