const functions = require('firebase-functions');
const express = require('express');
const app = express();

// ルートハンドラの定義
app.get('/hello', (req: any, res: any) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  res.send('Hello from Firebase Functions with Express!');
});

exports.api = functions.region('asia-northeast1').https.onRequest(app);