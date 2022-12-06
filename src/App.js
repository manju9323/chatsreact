import './App.css';
import Messanger from "./pages/messanger/Messanger"
import Login from './Login';
import Register from './Register';
import { BrowserRouter, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/Home';

function App() {
  return (            
    <div className="App">
     <BrowserRouter>
      
      <Route exact path="/" component={Login} />
       <Route exact path="/register" component={Register}/>
      <Route exact path="/mess" component={Messanger}/>
      <Route exact path="/home" component={Home}/>
     <ToastContainer/>
 
    </BrowserRouter>
   </div> 
  );
}

export default App;

