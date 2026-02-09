import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Nav from './Nav';
import GolfApparel from './Golf_apparel';
import Hats from './Hats';
import Hoodies from './Hoodies_and_Sweatshirts';
import Footer from './Footer';
import Cart from './Cart';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/golf-apparel" element={<GolfApparel />} />
        <Route path="/sweatshirts" element={<Hoodies />} />
        <Route path="/hats" element={<Hats />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
