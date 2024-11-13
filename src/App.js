import { Route, Routes } from 'react-router-dom';
import './App.css';
import Welcome from './routes/Welcome';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          {/* <Route path="/game" element={<Game />} /> */}
        </Routes>
    </div>
  );
}

export default App;
