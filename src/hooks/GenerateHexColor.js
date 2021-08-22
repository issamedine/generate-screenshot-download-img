import React, { useEffect, useState } from 'react';

function GenerateHexColor() {
  const [isLoading, setIsLoading] = useState(true);
  const [listColorHex, setListColorHex] = useState([]);

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
  return { isLoading, listColorHex };
}

export default GenerateHexColor;
