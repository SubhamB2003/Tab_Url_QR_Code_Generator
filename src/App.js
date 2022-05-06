import { useState } from 'react';
import './App.css'
/*global chrome*/

function App() {

  const [qrImg, setQrImg] = useState('');
  const [check, setCheck] = useState(false);

  const handleClick = () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let URL = tabs[0].url;
      setQrImg(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${URL}`);
      setCheck(true);
    });
  }

  return (
    <div className='bg'>
      <div className="container" style={{ height: '150vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="bg-white mt-10 rounded-xl shadow-2xl shadow-black" style={{ backgroundColor: 'white' }}>
          <div className='p-10'>
            <h1 className="font-serif text-4xl text-center">QR Code Generator</h1>
            <p className='font-serif text-center pt-2 text-gray-600 text-lg'>Click the button and generate the current tab qr code</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button
                className="btn text-center font-serif px-20 py-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg pt-4"
                onClick={() => handleClick()}
              >
                Generate QR Code
              </button>
            </div>
            <div className='pt-2'>
              {!check ? (
                <div className="qr-code">
                  <img src={qrImg} alt="qr-code" style={{ visibility: 'hidden' }} />
                </div>
              ) : (
                <div>
                  <p className='font-serif text-center pb-2 text-gray-600 text-lg'>Scan the QR to check the URL</p>
                  <div className='active border p-6 rounded-xl' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={qrImg} alt="qr-code" className="" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
