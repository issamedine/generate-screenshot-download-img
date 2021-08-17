import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [listColorHex, setListColorHex] = useState([]);
  const [listColorHexJSON, setListColorHexJSON] = useState();

  useEffect(() => {
    let colorHex = [];
    let start = 0xff0000,
      // end = 0x00ff00,
      end = 0xff0100,
      temp;

    const interval = setInterval(() => {
      if (start === end) {
        clearInterval(interval);
      }
      temp = start.toString(16);
      if (temp.length < 8) {
        temp = '00000'.substring(0, 6 - temp.length) + temp;
        colorHex.push(`#${temp}`);
      }
      start++;
      if (colorHex[colorHex.length - 1] === '#ff0100') {
        setListColorHex(colorHex);
        setIsLoading(false);
      }
    }, 10);
    return () => clearInterval(interval);
  }, []);

  console.log('state', listColorHex);

  const [valInput, setValInput] = useState(0);
  const handleChange = (e) => {
    setArrayWithNumRandom([]);
    setValInput(e.target.value);
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [arrayWithNumRandom, setArrayWithNumRandom] = useState([]);

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

  const [img, setImg] = useState('');

  const [onScreen, setOnScreen] = useState(true);
  const [srcImg, setSrcImg] = useState();

  const screenshot = async () => {
    if (onScreen === false) return;
    const app = document.querySelector('.wrapper');
    const imgScreened = document.querySelector('.wrapper-img-screened');
    const c = await html2canvas(app);
    const imgData = c.toDataURL('image/png');
    const image = new Image();
    image.src = imgData;
    setSrcImg(image.src);
    console.log(image.src);
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
