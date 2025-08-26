import react from 'react';
import './App.css';
import Homelayout from './components/Home/Homelayout';
import Adminlayout from './components/Admin/AdminLayout';
import EditFitnessClass from './components/Admin/EditFitnessClass';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return (
    
      <Router>
        <div className="App">
          <Routes>
            {/* <Route path='/' element={<Homelayout/>}></Route> */}
            {/* <Route path='/' element={<Adminlayout/>}></Route> */}
            <Route path='/' element={<EditFitnessClass/>}></Route>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
