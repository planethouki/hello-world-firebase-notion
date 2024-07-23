import * as admin from 'firebase-admin';

export default class FirebaseAdmin {
  static isInitialized = false;
  static getFirebaseAdmin() {
    if (!this.isInitialized) {
      this.isInitialized = true;
      admin.initializeApp();
    }
    return admin;
  }
}
