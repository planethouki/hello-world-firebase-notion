const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/', (req: any, res: any) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  res.send('/ Hello from Firebase Functions with Express!');
});

app.get('/hello', (req: any, res: any) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  res.send('/hello Hello from Firebase Functions with Express!');
});

app.get('/api/hello', (req: any, res: any) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  res.send('/api/hello Hello from Firebase Functions with Express!');
});

exports.api = functions.region('asia-northeast1').https.onRequest(app);