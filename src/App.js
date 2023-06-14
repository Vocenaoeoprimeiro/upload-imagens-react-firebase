import React, { useState } from 'react';
import firebase from './firebase';

import './App.css';

function App() {

  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);

  const storage = firebase.storage();

  const imageUpload = () => {
    const storaRef = storage.ref();
    const promises = [];

    for(let i = 0; i < images.length; i++){
      const image = images[i];
      const imageRef = storaRef.child(`images/${image.name}`);
      promises.push(imageRef.put(image));
    }

    Promise.all(promises)
      .then(() => {
        setProgress(100);
        setImages([]);
      })
      .catch((error) => {
        console.error(error);
      });   

  }

  return (
    <div className="App">
      <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
      <button onClick={imageUpload}>Upload</button>
      {progress}%
    </div>
  );
}

export default App;
