import './App.css';
import { BrowserRouter as Router, Routes, Route , Link} from "react-router-dom";
import Home from './pages/Home/index';
import Login from './pages/login/index';
import Dashboard from './components/dashboard';


function App() {

  return (
    <Router>
      <nav>
        <Link to="/"></Link>
        <Link to="/"></Link>
        <Link to="/"></Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Dashboard" element={<Dashboard />}/>
      </Routes>
    </Router> 
        
  );
}
export default App;
