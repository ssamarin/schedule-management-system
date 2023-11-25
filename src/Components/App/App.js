import React from 'react';

import Header from '../Header';
import Menu from '../Menu';
import Filters from '../Filters';

function App() {
  return (
    <div className="App">
      <Header />
      <Menu />
      <main className="main">
        <Filters />
      </main>
    </div>
  );
}

export default App;
