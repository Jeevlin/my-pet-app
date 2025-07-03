import './App.css';
import Login from "./login/login";
import Register from "./register/register";
import Homepage from "./homepage/homepage"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,Route,Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import useAuth from './context/auth/useAuth';
import { Navigate } from 'react-router-dom';

function App() {

  const {user,loading} = useAuth()
  if (loading) return <h2>Loading...</h2>; // Prevents flashing before Firebase loads


  return (
    <>
     <div className="App">
   
    
   <Routes>
   <Route path="/"element={<Login></Login>}></Route>
   <Route path="/register"element={<Register></Register>}></Route>
   <Route path="/homepage" element={user ? <Homepage/> : <Navigate to="/" />}></Route>

   
   
   </Routes>
  
   <ToastContainer />
   </div>
 
     
    </>
  )
}

export default App
