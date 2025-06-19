import './App.css';
import Navigation from './components/Navigation';
import Gallery from './components/Gallery'
import Halloween from './components/Halloween';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <main className="bg-dark text-white" style={{ minHeight: '100vh' }}>
          <Routes>
            <Route path="/gallery" element={<Gallery />} />

            <Route path="/gallery/halloween" element={<Halloween />} />

            <Route path="*" element={<Navigate to="/gallery" replace />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
