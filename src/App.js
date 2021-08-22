import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import './App.css';
import GenerateHexColor from './hooks/GenerateHexColor';
import getRandomInt from './helpers/randomInt';

function App() {
  const { isLoading, listColorHex } = GenerateHexColor();
  const [listColorHexJSON, setListColorHexJSON] = useState();
  const [arrayWithNumRandom, setArrayWithNumRandom] = useState([]);
  const [valInput, setValInput] = useState(0);
  const [onScreen, setOnScreen] = useState(true);
  const [srcImg, setSrcImg] = useState();
  

  const handleChange = (e) => {
    setArrayWithNumRandom([]);
    setValInput(e.target.value);
  };

  useEffect(() => {
    if (valInput === 0) return;
    [...Array(+valInput).keys()].map((el) =>
      setArrayWithNumRandom((prev) => [...prev, getRandomInt(-100, 100)]),
    );
  }, [valInput]);

  useEffect(() => {
    const res = {};
    listColorHex.forEach((el, i) => (res[arrayWithNumRandom[i]] = el));
    delete res[undefined];
    setListColorHexJSON(Object.values(res));
  }, [arrayWithNumRandom]);

  const screenshot = async () => {
    if (onScreen === false) return;
    const app = document.querySelector('.wrapper');
    const imgScreened = document.querySelector('.wrapper-img-screened');
    const c = await html2canvas(app);
    const imgData = c.toDataURL('image/png');
    const image = new Image();
    image.src = imgData;
    setSrcImg(image.src);
    const img = app.appendChild(image);

    imgScreened.appendChild(img);

    setOnScreen(false);
  };

  if (isLoading) return <div className="loading">loading...</div>;

  return (
    <div className="App">
      <span>Enter any number :</span>
      <input autoFocus type="text" onChange={(e) => handleChange(e)} />
      <div className="wrapper">
        {[...Array(+valInput).keys()].map((el, i) => (
          <div
            key={i}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: `${listColorHexJSON[i]}`,
            }}
          ></div>
        ))}
      </div>
      <div className="wrapper-img-screened">
        {!onScreen && <span>Image screened : </span>}
      </div>
      <div className="wrapper-screen-btn">
        <button onClick={screenshot}>Screenshot</button>
        <a href={srcImg} download target="_blank">
          download your image
        </a>
      </div>
    </div>
  );
}

export default App;
