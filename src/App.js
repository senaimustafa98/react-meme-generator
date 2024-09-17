import { useState, useEffect } from 'react';



export default function App() {
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [template, setTemplate] = useState('kk');
    const [tempInput, setTempInput] = useState(template);

     // Set the initial image URL based on the template with dependancies
    useEffect(() => {
      if (template) {
          setImageUrl(`https://memegen.link/${template}/${topText}/${bottomText}.jpg`);
      }
  }, [template, topText, bottomText]);

  {/* Creating a function to handle submitting via enter only */}
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        setTemplate(tempInput);
    }
};


  return (
  <>
    <h1
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: '50px',
        margin: '35px',
        border: '5px',
      }}
    >
      React Meme Generator
    </h1>

      {/* Top Text */}
    <div style ={{fontSize: '35px'}}>
    <label htmlFor="topTextInput" style={{margin: '15px 30px'}}>Top text</label>
    <input value={topText} onChange={(event) => setTopText(event.currentTarget.value)}
      />
    </div>

      {/* Image */}
      <div>
      <img
            src={imageUrl}
            data-test-id="meme-image"
            alt="meme picture"
            width={350}
            height={350}
            />

      </div>
    {/* Bottom Text */}
    <div style ={{fontSize: '35px'}}>
    <label htmlFor="bottomTextInput" style={{margin: '15px 30px'}}>Bottom text</label>
    <input value={bottomText} onChange={(event) => setBottomText(event.currentTarget.value)} />
    </div>

      {/* template */}
    <div style ={{fontSize: '25px'}}>
    <label htmlFor="tempInput" style={{margin: '15px 30px'}}>Meme Template</label>

    <input value={tempInput}
    onChange={(event) => setTempInput(event.currentTarget.value)}
    onKeyDown={handleKeyDown}
    />
    </div>

      <button
      onClick={() => {
      }}
      >

      </button>
  </>
  );
}
