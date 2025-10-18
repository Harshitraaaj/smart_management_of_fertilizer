import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx';
import Analyze from './pages/Analyze.jsx';
import About from './pages/About.jsx';
import Store from './pages/Store.jsx';
import Error from './pages/Error.jsx';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/about" element={<About />} />
        <Route path="/store" element={<Store />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
