import { useState, useEffect } from 'react';

export default function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [initial, setInitial] = useState('kk');
  const [tempInput, setTempInput] = useState(initial);

  // Set the initial image URL based on the template with dependancies
  useEffect(() => {
    if (initial && topText && bottomText) {
      const encodedTopText = encodeURIComponent(topText);
      const encodedBottomText = encodeURIComponent(bottomText);
      const encodedInitial = encodeURIComponent(initial);

      setImageUrl(
        `https://memegen.link/${encodedInitial}/${encodedTopText}/${encodedBottomText}.jpg`,
      );
    }
  }, [initial, topText, bottomText]);

  /* Creating a function to handle submitting via enter only */
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setInitial(tempInput);
    }
  };
  /* Handling download via function */
  const handleDownload = async () => {
    const corsProxy = 'https://corsproxy.io/?';
    const proxiedImageUrl = `${corsProxy}${imageUrl}`;

    try {
      const response = await fetch(proxiedImageUrl);
      if (!response.ok) throw new Error('Network response was not ok.');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `meme-${initial}-${topText}-${bottomText}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Release the Blob URL after download
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  return (
    <>
      <h1
        style={{
          textAlign: 'center',
          fontSize: '5em',
          fontFamily: 'cursive',
        }}
      >
        Meme Generator
      </h1>

      {/* Image */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
          marginRight: '400px',
        }}
      >
        <button
          onClick={handleDownload}
          style={{
            alignSelf: 'center',
            fontSize: '50px',
            cursor: 'pointer',
            border: '15px black solid',
            marginRight: '10em',
          }}
        >
          Download
        </button>

        <img
          src={imageUrl}
          data-test-id="meme-image"
          alt="meme"
          width="600px"
          height="600px"
          style={{ border: '5px solid black', marginLeft: '300px' }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          marginTop: '-500px',
        }}
      >
        {/* template */}
        <div
          style={{
            fontSize: '30px',
            marginBottom: '20px',
          }}
        >
          <label
            htmlFor="tempInput"
            style={{
              display: 'block',
              marginBottom: '10px',
            }}
          >
            Meme template
          </label>
          <input
            id="tempInput"
            value={tempInput}
            onChange={(event) => setTempInput(event.currentTarget.value)}
            onKeyDown={handleKeyDown}
            style={{
              padding: '10px',
              fontSize: '20px',
              width: '100%',
            }}
          />
        </div>

        {/* Top Text */}
        <div
          style={{
            fontSize: '35px',
            marginBottom: '20px',
          }}
        >
          <label
            htmlFor="topTextInput"
            style={{
              display: 'block',
              marginBottom: '10px',
              fontSize: '35px',
            }}
          >
            Top text
          </label>
          <input
            id="topTextInput"
            value={topText}
            onChange={(event) => setTopText(event.currentTarget.value)}
            style={{
              padding: '10px',
              fontSize: '20px',
              width: '60vh',
            }}
          />
        </div>

        {/* Bottom Text */}
        <div style={{ fontSize: '35px' }}>
          <label
            htmlFor="bottomTextInput"
            style={{
              display: 'block',
              marginBottom: '10px',
              fontSize: '35px',
            }}
          >
            Bottom text
          </label>
          <input
            id="bottomTextInput"
            value={bottomText}
            onChange={(event) => setBottomText(event.currentTarget.value)}
            style={{
              padding: '10px',
              fontSize: '20px',
              width: '60vh',
            }}
          />
        </div>
      </div>
    </>
  );
}
