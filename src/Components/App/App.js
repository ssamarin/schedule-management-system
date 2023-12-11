import React from 'react';

import Header from '../Header';
import Menu from '../Menu';
import Filters from '../Filters';
import Table from '../Table';

function App() {
  return (
    <div className="App">
      <Header />
      <Menu />
      <main className="main">
        <Filters />
        <Table />
      </main>
    </div>
  );
}

export default App;
