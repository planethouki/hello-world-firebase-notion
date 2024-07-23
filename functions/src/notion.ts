import functions = require('firebase-functions');
import express = require('express');
import * as admin from 'firebase-admin';
const router = express.Router();

router.get('/oauth/callback', async (req, res) => {
  functions.logger.info("/oauth/callback", {structuredData: true});

  const NOTION_CLIENT_ID = process.env.NOTION_CLIENT_ID;
  const NOTION_CLIENT_SECRET = process.env.NOTION_CLIENT_SECRET;
  const NOTION_REDIRECT_URI = process.env.NOTION_REDIRECT_URI;

  const code = req.query.code as string;

  try {
    const encoded = Buffer.from(`${NOTION_CLIENT_ID}:${NOTION_CLIENT_SECRET}`).toString('base64');
    const tokenResponse = await fetch('https://api.notion.com/v1/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encoded}`
      },
      body: JSON.stringify({
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: NOTION_REDIRECT_URI,
      })
    }).then((res) => res.json())

    const {
      access_token: notionAccessToken,
      workspace_id: notionWorkspaceId,
      owner: notionUser
    } = tokenResponse;
    const notionUserId = notionUser.user.id;
    const notionUserEmail = notionUser.user.person.email;

    if (!notionAccessToken || !notionWorkspaceId || !notionUserId || !notionUserEmail) {
      return res
        .send('notion access token or workspace id or user id or email is missing')
        .status(500);
    }

    const userRef = admin.firestore().doc('test');
    await userRef.set({
      notionAccessToken,
      notionWorkspaceId,
      notionUserId,
      notionUserEmail,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

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
