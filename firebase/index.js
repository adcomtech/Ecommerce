import admin from 'firebase-admin';

const serviceAccount = './config/fbServiceAccountKey.json';

export const fbAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
