import React, { useEffect } from 'react'
import Navbar from './components/navbar/Navbar'
import Home from "./components/home/Home.jsx"
import About from './components/about/about.jsx'
import Footer from './components/footer/Footer.jsx'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Signup from './components/signup/Signup.jsx'
import SignIn from './components/signup/SignIn.jsx'
import Todo from './components/todo/Todo.jsx'
import { useDispatch } from "react-redux";
import { authActions } from "./store";

const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
  },[])
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/todo" element={<Todo/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<SignIn/>}/>
      </Routes>
      <Footer/>
    </Router>
    
    </>
  )
}

export default App;