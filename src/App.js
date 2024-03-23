import logo from './logo.svg';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import Detail from './pages/detail';

function App() {
  return (

    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact Component={Main} />
          <Route path='/detail' exact Component={Detail} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
