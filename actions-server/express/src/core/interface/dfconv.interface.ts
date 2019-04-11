import { IsessionStorage, IuserStorage } from './storage.interface';
import { DialogflowConversation } from 'actions-on-google';
import { Imiddleware } from './middleware.interface';
import { Inode } from '../middleware/graph';

//
// overloading DialogflowConversation to add both user and session database access on couchdb
export interface IDFConv extends DialogflowConversation<IsessionStorage, IuserStorage> {
  middleware: Imiddleware;
  node: Inode;
  // empty here to add proprieties, go to Imiddleware
}