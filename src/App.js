import React from 'react';
import './css/App.css';
import SetInitialLocalStorage from './GlobalFuncs/setInitialLocalStorage';
import Routes from './Routes';

function App() {
  SetInitialLocalStorage();

  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
