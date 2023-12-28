import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from '../Header';
import Menu from '../Menu';

import MainPage from '../Pages/MainPage';
import EmptyBookPage from '../Pages/EmptyBookPage';
import EmptyDrivePage from '../Pages/EmptyDrivePage';
import EmptyCarPage from '../Pages/EmptyCarPage';
import EmptyAdminPage from '../Pages/EmptyAdminPage';
import EmptyBriefcasePage from '../Pages/EmptyBriefcasePage';
import EmptyMsgPage from '../Pages/EmptyMsgPage';
import EmptyDangerPage from '../Pages/EmptyDangerPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Menu />
        <main className="main">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/emptyBook" element={<EmptyBookPage />} />
            <Route path="/emptyDrive" element={<EmptyDrivePage />} />
            <Route path="/emptyCar" element={<EmptyCarPage />} />
            <Route path="/emptyAdmin" element={<EmptyAdminPage />} />
            <Route path="/emptyBriefcas" element={<EmptyBriefcasePage />} />
            <Route path="/emptyMsg" element={<EmptyMsgPage />} />
            <Route path="/emptyDanger" element={<EmptyDangerPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
