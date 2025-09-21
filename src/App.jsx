import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Homepage from './pages/Homepage'
import LoadingPage from './Components/LoadingPage'
import './index.css'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Router>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Homepage />
      )}
    </Router>
  );
}

export default App;