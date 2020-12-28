import React, { useState, useRef } from 'react';
import './App.css';
// import './cam'
// import getWebCam from './cam';


const URLAPI = `http://localhost:5000`
function App() {

  // eslint-disable-next-line
  const [data, setData] = useState([])
  // eslint-disable-next-line
  const [image, setImage] = useState('https://www.kienyke.com/wp-content/uploads/2018/10/selfie.jpg')

  const handleOnChange = event => {
    setImage(event.target.value)
  }

  const handleClickImage = async event => {
    event.preventDefault()
    console.log('click')
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: image,
        })
      }

      const resp = await fetch(`${URLAPI}/create-facelist`, fetchOptions)
      const people = await resp.json()
      console.log(people.data)
      setData(people.data)
    } catch (err) {
      console.error(err)
    }
  }

  const [playing, setPlaying] = useState(false);

  const vest = useRef(null);
  const videoRef = useRef(null);



  const HEIGHT = 650;
  const WIDTH = 490;

  const startVideo = () => {
    setPlaying(true);
    navigator.getUserMedia(
      {
        video: true,
      },
      (stream) => {
        let video = document.getElementsByClassName('app__videoFeed')[0];
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  };

  const stopVideo = () => {
    setPlaying(false);
    let video = document.getElementsByClassName('app__videoFeed')[0];
    video.srcObject.getTracks()[0].stop();
  };

  const snap = () => {
    if (playing === false) {
      console.log("no camera found")
    }
    else {
      console.log("camera found", vest)
      var context = vest.current.getContext('2d')
      context.drawImage(videoRef.current, 0, 0, HEIGHT, WIDTH);

    }
    console.log('snap')
  }

  window.onload = () => {
    const canvas = document.getElementById('canvas');

    const saveButton = document.getElementById('save');
    saveButton.addEventListener('click', () => save(canvas));
  };

  // save function
  function save(canvas) {
    const data = canvas.toDataURL('image/png');
    const anchor = document.createElement('a');
    anchor.href = data;
    anchor.download = 'image.png';
    anchor.click();
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>

          Upload a JPG image
        </p>
        <div className="containerFile">
          <input
            className="inputFile"
            placeholder="Upload image"
            onChange={handleOnChange}
            value={image}
          />
          <button
            className="buttonFile"
            onClick={handleClickImage}
          >
            Upload
          </button>
        </div>
        <h3 className="titleAtribute">Image attributes: </h3>
        <ul>
          {
            data.map(item => (
              <li key={item.faceId}>
                <span>
                  Gender: {item.faceAttributes.gender}, age: {item.faceAttributes.age}
                </span>
              </li>
            ))
          }
        </ul>
        <img
          src={image}
          width={220}
          height={180}
          alt={image}
        />
        <a
          className="App-link"
          href={image}
          target="_blank"
          rel="noopener noreferrer"
        >
          Link of the image: {image}
        </a>
        <div className="app">
          <div className="app__container">

            <video ref={videoRef}
              height={HEIGHT}
              width={WIDTH}
              muted
              autoPlay
              className="app__videoFeed"
            ></video>
          </div>

          <canvas ref={vest} id="canvas" width={WIDTH} height={HEIGHT}></canvas>

          <div className="app__input">
            {playing ? (
              <button onClick={stopVideo}>Stop</button>
            ) : (
                <button onClick={startVideo}>Start</button>
              )}
            <button className="btn btn-success" id="capture" onClick={snap}>CAPTURE</button>

          </div>

          <button id="save" type="button">save</button>
        </div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <video autoplay="true" id="video" idth="650" height="490"></video>
            </div>
            <div class="col-md-6">
              <canvas id="canvas" width="650" height="490"></canvas>
            </div>
          </div>
        </div>
        <div class="container text-center mb-5">
          <button class="btn btn-success" id="capture">CAPTURE</button>

        </div>
      </header>
    </div>
  );
}

export default App;
