import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Signup from './pages/signup/Signup';
import SignIn from './pages/signIn/SignIn';
import Dashboard from './pages/dashboard/Dashboard';

function App() {

  const user = localStorage.getItem('token')

  return (
    <Router>
      <Routes>
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to={'/'}/>} />
        <Route path='/signin' element={!user ? <SignIn/> : <Navigate to={'/'}/>} />
        <Route path='/' element={user ? <Dashboard/> : <Navigate to={'/signin'}/>} />
      </Routes>
    </Router>
  )
}

export default App
