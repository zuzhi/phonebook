import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import InstantApp from './InstantApp.jsx'

const MainApp = () => {
  const [showInstantApp, setShowInstantApp] = useState(false)

  const toggleApp = () => {
    setShowInstantApp(!showInstantApp)
  };

  return (
    <div>
      <button onClick={toggleApp}>
        {showInstantApp ? 'Switch to App' : 'Switch to InstantApp'}
      </button>
      {showInstantApp ? <InstantApp /> : <App />}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
)
