// import { useState } from 'react'
import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ForgetPassPage from './pages/ForgetPass';
import ResetPassPage from './pages/ResetPass';
import TodoPage from './pages/Todo';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Route path="/" component={HomePage} exact></Route>
      <Route path="/register" component={RegisterPage}></Route>
      <Route path="/login" component={LoginPage}></Route>
      <Route path="/forget-password" component={ForgetPassPage}></Route>
      <Route
        path="/api/v1/auth/reset-password/:userId/:resetToken"
        component={ResetPassPage}
      ></Route>
      <Route path="/todo" component={TodoPage}></Route>
    </div>
  );
}

export default App;
