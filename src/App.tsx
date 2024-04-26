import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Signup from './pages/signup/Signup';
import SignIn from './pages/signIn/SignIn';
import Dashboard from './pages/dashboard/Dashboard';
import { useSelector } from 'react-redux';


interface RootState{
  auth:{
      token: string
  }
  }

function App() {

  // const user = localStorage.getItem('token')
    const {token} = useSelector((state:RootState)=>state.auth)


  return (
    <Router>
      <Routes>
        <Route path='/signup' element={!token ? <Signup /> : <Navigate to={'/'}/>} />
        <Route path='/signin' element={!token ? <SignIn/> : <Navigate to={'/'}/>} />
        <Route path='/' element={token ? <Dashboard/> : <Navigate to={'/signin'}/>} />
      </Routes>
    </Router>
  )
}

export default App
