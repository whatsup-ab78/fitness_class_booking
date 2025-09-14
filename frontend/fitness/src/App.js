import react from 'react';
import './App.css';
import Homelayout from './components/Home/Homelayout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Home/Login';
import Register from './components/Home/Register';
import AdminLayout from './components/Admin/AdminLayout';
import Addclass from './components/Admin/Addclass';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserLayout from './components/User/UserLayout';



function App() {
  return (
    
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<Homelayout/>}></Route>
            <Route path='login' element={<Login/>}></Route>
            <Route path ='register' element= {<Register/>}></Route>



           <Route path='/admin' element={<AdminLayout/>}>
           <Route index element={<AdminDashboard/>}></Route>
           <Route path='addclass' element={<Addclass/>}></Route>
           </Route>


           <Route path='/user' element={<UserLayout/>}>
           <Route index element={<AdminDashboard/>}></Route>
           </Route>
         
          </Routes>
        </div>
      </Router>
  );
}

export default App;
