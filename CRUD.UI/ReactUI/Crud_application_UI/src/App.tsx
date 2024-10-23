import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Import your page components
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgetPassword from './pages/auth/ForgetPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Default from './layout/Default';
import Home from './pages/navbarPages/Home';
import About from './pages/navbarPages/About';

function App() {
  return (
    <Router>
      <Routes>
        {/* Non authorized routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        {/* Authorized routes that only authorized user can use */}
        <Route path="/default" element={<Default />}>
          <Route index element={<Home />} />
          <Route path='/default/about' element={<About />} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;