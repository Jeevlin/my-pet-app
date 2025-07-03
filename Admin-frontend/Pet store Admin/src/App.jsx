import { useState,useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login'
import Forgot from './pages/forgot';
import Message from './pages/message';
import Navbar from './pages/navbar'
import { Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    return localStorage.getItem('authToken')?true:false;
  }); // State to track login
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  
  // Simulating login state
  const handleLogin = () => {
    localStorage.setItem("authToken", "your_token_here")
    setIsLoggedIn(true); 
  };

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" replace />;  
  };
  




  return (

    <div>
    <Routes>
    <Route path="/" element={<Login onLogin={handleLogin} />}></Route>
    <Route path="/forgot" element={<Forgot />}></Route>
    <Route path="/message" element={<Message/>}></Route>
    <Route
          path="/navbar"
          element={
            <PrivateRoute>
              <Navbar />
            </PrivateRoute>
          }
        />
    </Routes>
    </div>
    
     
   
  )
}

export default App
