import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBILsalGg1gkWGnHkHHaOKFwVufVjiBR4k',
  authDomain: 'fir-library-upload.firebaseapp.com',
  projectId: 'fir-library-upload',
  storageBucket: 'fir-library-upload.appspot.com',
  messagingSenderId: '814194460819',
  appId: '1:814194460819:web:01f2a72ec6a93a52e4a566',
  measurementId: 'G-F58XBFKCB2',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadFiles = (file, folder = 'images') => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, folder + '/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export { storage, uploadFiles };
