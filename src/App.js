import './App.scss';
import './index.css';
import './styles/components.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import Detail from './pages/detail';
import Header from './pages/components/Header';
import Footer from './pages/components/Footer';
function App() {
  return (

    <Router>
      <Header />
      <Routes>
        <Route path='/' exact Component={Main} />
        <Route path='/detail/:id' exact Component={Detail} />
      </Routes>
      <Footer />
    </Router >

  );
}

export default App;
