import * as functions from 'firebase-functions';
import { app } from './app/app';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);