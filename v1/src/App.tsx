// import { useState } from 'react'
import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './pages/Home';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Route path="/" component={HomePage}></Route>
    </div>
  );
}

export default App;
