import { Inode } from './../../interface/node.interface';

// global no-input intent
export const noInput: Inode = {
  return: true,
  conv: {
    ask: 'tu ne dis rien'
  }
};

// cancel intent 
export const cancel: Inode = {
  return: true,
  conv: {
    close: 'Au revoir',
  },
};

// global fallback may be used in app.ts
export const fallback: Inode = {
  return: true,
  conv: {
    close: 'pas compris',
  },
};

// global error
export const error: Inode = {
  return: true,
  conv: {
    close: 'error.global'
  }
};


// 
// FOr the graph,
// make a class to get all node

// one function for insert a new node in the graph
// param : Symbol, node

// one function to get a node with symbol string description
// used to core exec to get a node in function of the state in session
//

// a getter with a symbol in param and return node
//

