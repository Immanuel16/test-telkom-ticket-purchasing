import { Route, Routes } from 'react-router-dom';
import CheckoutPage from './CheckoutPage';
import Home from './Home';
import './App.scss'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/checkout/:id' element={<CheckoutPage />} />
    </Routes>
  );
}

export default App;
