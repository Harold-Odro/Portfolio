import { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Homepage from './pages/Homepage'
import LoadingPage from './Components/LoadingPage'

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