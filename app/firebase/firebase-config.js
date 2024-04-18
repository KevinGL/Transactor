import * as admin from 'firebase-admin';
import * as path from 'path';
import serviceAccount from "@/transactor-42fb8-firebase-adminsdk-akyo6-0c909839e6.json";

if (!admin.apps.length)
{
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://transactor-42fb8.firebaseio.com'
    });
}

export const db = admin.firestore();

/*// Exemple d'utilisation : récupérer des données depuis Firestore
firestore.collection('users').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
        });
    })
    .catch(err => {
        console.error('Erreur de récupération des données:', err);
    });
*/