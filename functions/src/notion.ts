import functions = require('firebase-functions');
import express = require('express');
import FirebaseAdmin from './FirebaseAdmin'
import * as cors from 'cors';
const router = express.Router();

router.use(cors({ origin: 'http://localhost:5173' }));

router.post('/token', async (req, res) => {
  functions.logger.info(req.path, {structuredData: true});

  const NOTION_CLIENT_ID = process.env.NOTION_CLIENT_ID;
  const NOTION_CLIENT_SECRET = process.env.NOTION_CLIENT_SECRET;
  const NOTION_REDIRECT_URI = (() => {
    if (req.headers.origin === 'http://localhost:5173') {
      return `http://localhost:5173${new URL(process.env.NOTION_REDIRECT_URI as string).pathname}`;
    }
    return process.env.NOTION_REDIRECT_URI;
  })();

  const admin = FirebaseAdmin.getFirebaseAdmin();

  const code = req.body.code as string;

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

    functions.logger.info(tokenResponse.owner);

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

    const loginHistoryRef = admin
      .firestore()
      .collection('loginHistories')
      .doc(`${Date.now()}-${notionUserId}`);
    await loginHistoryRef.set({
      tokenResponse,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const user = {
      id: notionUserId,
      email: notionUserEmail,
      notionWorkspaceId,
    }

    const userRef = admin.firestore().collection('users').doc(notionUserId);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      await userRef.update({
        ...user,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    } else {
      await userRef.set({
        ...user,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    const customToken = await admin.auth().createCustomToken(notionUserId);

    return res
      .header('Content-Type', 'application/json')
      .send({ token: customToken })
  } catch (error) {
    functions.logger.error(error);
    return res
      .status(500)
      .send('error')
  }

});

export default router;
