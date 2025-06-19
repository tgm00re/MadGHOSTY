import './App.css';
import Navigation from './components/Navigation';
import Gallery from './components/Gallery'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <main className="bg-dark text-white" style={{ minHeight: '100vh', padding: '1rem' }}>
          <Routes>
            <Route path="/gallery" element={<Gallery />} />


            <Route path="*" element={<Navigate to="/gallery" replace />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
