const functions = require('firebase-functions');
const express = require('express');
const app = express();
const router = express.Router();

router.get('/', (req: any, res: any) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  res.send('/ Hello from Firebase Functions with Express!');
});

router.get('/hello', (req: any, res: any) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  res.send('/hello Hello from Firebase Functions with Express!');
});

app.use('/api', router);

exports.api = functions.region('asia-northeast1').https.onRequest(app);