import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import RecoverPassword from "./pages/RecoverPassword";
import Details from "./pages/Details";

function App() {
  return (
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/signin" element={<LoginPage/>} />
            <Route path="/recover-password" element={<RecoverPassword/>} />
            <Route path="/details/:id" element={<Details />}/>
            <Route path="*" element={<Navigate to="/" />}/> 
        </Routes>
      </BrowserRouter>
  );
}

export default App;