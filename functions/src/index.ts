import functions = require('firebase-functions');
import express = require('express');
import notion from './notion';
const app = express();
const router = express.Router();

router.get('/hello', (req: any, res: any) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  res.send('/api/hello Hello from Firebase Functions with Express!');
});

app.use('/api', router);
app.use('/api/notion', notion);

exports.api = functions.region('asia-northeast1').https.onRequest(app);