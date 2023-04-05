// import { Link } from 'react-router-dom';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import IncomePage from './pages/IncomePage';
import IncomeEditForm from './components/IncomeEditForm';

function App() {

  return (
    <div className="App">
      
      <Routes>
        <Route index element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/income/edit/:id" element={<IncomeEditForm />}/>
      </Routes>
    </div>
  )
}

export default App
