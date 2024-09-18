import { useState, useEffect } from 'react';


export default function App() {
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [initial, setInitial] = useState('kk');
    const [tempInput, setTempInput] = useState(initial);


     // Set the initial image URL based on the template with dependancies
    useEffect(() => {
      if (initial) {
          setImageUrl(`https://memegen.link/${initial}/${topText}/${bottomText}.jpg`);
      }
  }, [initial, topText, bottomText]);
  {/* Creating a function to handle submitting via enter only */}
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        setInitial(tempInput);
    }
};

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
    <h1 style={{
      textAlign: 'center',
      fontSize: '5em',
      fontFamily: 'cursive',
      border: '5px black double',
    }}>
       Meme Generator
    </h1>


    {/* Image */}
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '30px',
      margin: 'auto 50px',
    }}>
      <img
            src={imageUrl}
            data-test-id="meme-image"
            alt="meme picture"
            width={450}
            height={450}
            style={{ border: '2px solid black', marginLeft: '300px' }}
            />

      <button
      onClick={handleDownload}
      style={{
        alignSelf: 'center',
        justifySelf: 'center',
        fontSize: '50px',
        cursor: 'pointer',
        marginRight: '500px',
        border: '15px black solid'
      }}>
        Download
      </button>

      </div>

      {/* template */}
    <div style ={{
       fontSize: '30px',
       marginBottom: '20px',
      }}>
    <label htmlFor="tempInput" style={{
      display: 'block',
      marginBottom: '10px',
    }}>
      Meme Template</label>
    <input id="tempInput" value={tempInput}
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
    <div style ={{
      fontSize: '35px',
      marginBottom: '20px',
      }}>
    <label htmlFor="topTextInput" style={{
      display: 'block',
      marginBottom: '10px',
      }}>
      Top text</label>
    <input id="topTextInput" value={topText} onChange={(event) => setTopText(event.currentTarget.value)}
    style={{
      padding: '10px',
      fontSize: '20px',
      width: '100%',
    }}
      />
    </div>



    {/* Bottom Text */}
    <div style ={{fontSize: '35px'}}>
    <label htmlFor="bottomTextInput" style={{marginBottom: '10px'}}>Bottom text</label>
    <input id="bottomTextInput" value={bottomText} onChange={(event) => setBottomText(event.currentTarget.value)}
    style={{
      padding: '10px',
      fontSize: '20px',
      width: '100%',
    }}
    />
    </div>





  </>
  );
}
