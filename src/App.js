import DashBoard from './_components/DashBoard';
import Hero from './_components/Hero';
import Login from './_components/Login';
import Register from './_components/Register';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<DashBoard/>} />
            <Route path='/register' element={<Register/>} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
