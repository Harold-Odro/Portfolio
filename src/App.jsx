import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './Components/ErrorBoundary'
import LoadingPage from './Components/LoadingPage'
import ScrollRestoration from './Components/ScrollRestoration'

// Error fallback component for failed lazy loads
const LazyLoadError = () => (
  <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center p-4">
    <div className="text-center max-w-md">
      <svg
        className="w-16 h-16 mx-auto mb-4 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h1 className="text-2xl font-bold text-white mb-2">Failed to Load Page</h1>
      <p className="text-gray-400 mb-6">
        The page could not be loaded. This might be due to a network error.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
      >
        Reload Page
      </button>
    </div>
  </div>
);

// Lazy load route components with error recovery
const Homepage = lazy(() =>
  import('./pages/Homepage').catch(() => ({
    default: LazyLoadError
  }))
);

const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage').catch(() => ({
    default: LazyLoadError
  }))
);

const ProjectDetail = lazy(() =>
  import('./pages/ProjectDetail').catch(() => ({
    default: LazyLoadError
  }))
);


function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollRestoration />
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;