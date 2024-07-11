import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import RepositoryDetailsPage from './components/RepositoryDetailsPage';
import ImportPage from './components/ImportPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/repository/:id" element={<RepositoryDetailsPage />} />
        <Route path="/import" element={<ImportPage />} />
      </Routes>
    </Router>
  );
};

export default App;