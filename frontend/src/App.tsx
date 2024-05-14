import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BrainTumor from './pages/BrainTumor';
import MedicineRecommendation from './pages/MedicineRecommendation';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/brain-tumor-detection' element={<BrainTumor />}></Route>
          <Route path='/medicine-recommendation' element={<MedicineRecommendation />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
