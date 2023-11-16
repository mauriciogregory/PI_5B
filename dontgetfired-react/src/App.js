import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import RecoverPassword from "./pages/RecoverPassword";
import Details from "./pages/Details";

function App() {
  return (
    // <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    // <div className="max-w-md w-full space-y-8">
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/signin" element={<LoginPage/>} />
            <Route path="/recover-password" element={<RecoverPassword/>} />
            <Route path="/details/:id" element={<Details />}/>
        </Routes>
      </BrowserRouter>
   // </div>
  // </div>
  );
}

export default App;