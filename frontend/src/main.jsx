import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import InstantApp from './InstantApp.jsx'
import SupabaseApp from './SupabaseApp.jsx'

const MainApp = () => {
  const [currentApp, setCurrentApp] = useState('App')

  const toggleApp = (app) => {
    setCurrentApp(app)
  };

  return (
    <div>
      <button onClick={() => toggleApp('App')}>
        {currentApp === 'App' ? 'Currently App' : 'Switch to App'}
      </button>
      <button onClick={() => toggleApp('InstantApp')}>
        {currentApp === 'InstantApp' ? 'Currently InstantApp' : 'Switch to InstantApp'}
      </button>
      <button onClick={() => toggleApp('SupabaseApp')}>
        {currentApp === 'SupabaseApp' ? 'Currently SupabaseApp' : 'Switch to SupabaseApp'}
      </button>
      {currentApp === 'App' && <App />}
      {currentApp === 'InstantApp' && <InstantApp />}
      {currentApp === 'SupabaseApp' && <SupabaseApp />}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
)
