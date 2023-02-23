import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home/index';
import Login from './pages/login/index';
import Dashboard from './components/dashboard';
import PrivateRoute from './components/dashboard/PrivateRoute';


function App() {

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute/>}>
            <Route element={<Dashboard/>} path="/dashboard" exact/>
        </Route>
        <Route path="/" element={<Login />}/>
      </Routes>
    </Router> 
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //   </Routes>

    //   <Routes>
    //     <PrivateRoute path="/Dashboard" component={Dashboard} role={role} />
    //     <Route path="/Login" component={Login} />
    //   </Routes>
    // </Router>


  );
}
export default App;
