import react from 'react';
import './App.css';
import Homelayout from './components/Home/Homelayout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return (
    
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<Homelayout/>}></Route>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
