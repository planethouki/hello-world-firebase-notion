# hello-world-firebase-notion

## 概要

このプロジェクトは、Vue.jsを使用して構築されたシングルページアプリケーション（SPA）です。
Firebase Authenticationを利用してユーザー認証を行いますが、
NotionのユーザーIDを利用してログインすることができます。

## 使用技術

- **Vue.js**: フロントエンドフレームワーク
- **Firebase Functions**: サーバーレス関数
- **Firebase Authentication**: ユーザー認証
- **Notion API**: Notionとの連携

## プロジェクト構成

- `client`: Firebase Hostingにデプロイする用のVue + Viteアプリケーション
- `functions`: Firebase Functionsにデプロイする用のサーバーレス関数

## 主な機能

- **Notionでログイン**: Notionユーザーでログインします

## セットアップ

このコードは、NotionのアクセストークンをFirestoreに保存しますので、
Firestoreは本番モードで使用してください。

1.  [Notion integrations](https://www.notion.so/profile/integrations)でPublic Integrationを作成

1. FirebaseにSecretを設定

```
$ firebase functions:secrets:set NOTION_CLIENT_ID
$ firebase functions:secrets:set NOTION_CLIENT_SECRET
$ firebase functions:secrets:set NOTION_REDIRECT_URI
```

3. `client/.env.sample`をコピーして`client/.env`を作成し内容を編集

4. 依存関係をインストール

```
$ cd functions && npm install
```

```
$ cd client && npm install
```

5. デプロイ

```
$ firebase deploy --only functions,hosting,firestore
```
