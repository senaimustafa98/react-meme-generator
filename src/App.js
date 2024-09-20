import { useState, useEffect } from 'react';

export default function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [initial, setInitial] = useState('kk');
  const [tempInput, setTempInput] = useState(initial);

  // Function to handle key down events
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setInitial(tempInput.replace(/ /g, '_'));
    }
  };

  // Function to handle image download
  const handleDownload = async () => {
    const imageUrlToFetch = imageUrl;
    console.log('Image URL for Download:', imageUrlToFetch);

    try {
      const response = await fetch(imageUrlToFetch);
      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);

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

  // Encoding function to handle special characters
  function encodeToUrl(text) {
    if (text.length === 0) return '_';
    return text
      .replace(/ /g, '_')
      .replace(/\?/g, '~q')
      .replace(/&/g, '~a')
      .replace(/%/g, '~p')
      .replace(/#/g, '~h')
      .replace(/\//g, '~s')
      .replace(/\\/g, '~b')
      .replace(/</g, '~l')
      .replace(/>/g, '~g');
  }

  // Set the initial image URL based on the template with dependencies
  useEffect(() => {
    if (initial) {
      const encodedTopText = encodeToUrl(topText);
      const encodedBottomText = encodeToUrl(bottomText);
      const newImageUrl = `https://api.memegen.link/images/${initial}/${encodedTopText}/${encodedBottomText}.jpg`;
      setImageUrl(newImageUrl);
    }
  }, [initial, topText, bottomText]);

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
          alignItems: 'center',
        }}
      >
        <button
          onClick={handleDownload}
          style={{
            fontSize: '50px',
            cursor: 'pointer',
            border: '15px black solid',
            marginBottom: '20px',
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
          style={{ border: '5px solid black' }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Template */}
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
