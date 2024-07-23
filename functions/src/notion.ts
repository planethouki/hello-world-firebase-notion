import functions = require('firebase-functions');
import express = require('express');
const router = express.Router();

const NOTION_CLIENT_ID = process.env.NOTION_CLIENT_ID;
const NOTION_CLIENT_SECRET = process.env.NOTION_CLIENT_SECRET;
const NOTION_REDIRECT_URI = process.env.NOTION_REDIRECT_URI;

router.get('/client', (req, res) => {
  res.send({
    a: Buffer.from(`${NOTION_CLIENT_ID}:${NOTION_CLIENT_SECRET}`).toString('base64'),
    b: NOTION_REDIRECT_URI,
    c: NOTION_CLIENT_ID
  })
})

router.get('/oauth/callback', async (req, res) => {
  functions.logger.info("/oauth/callback", {structuredData: true});

  const code = req.query.code as string;

  try {
    const basic = Buffer.from(`${NOTION_CLIENT_ID}:${NOTION_CLIENT_SECRET}`).toString('base64');
    const tokenResponse = await fetch('https://api.notion.com/v1/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${basic}`
      },
      body: JSON.stringify({
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: NOTION_REDIRECT_URI,
      })
    }).then((res) => res.json())

    return res
      .send(tokenResponse)
      .header('Content-Type', 'application/json');
  } catch (error) {
    functions.logger.error(error);
    return res
      .send('error')
      .status(500);
  }

});

export default router;
