import './App.scss';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import IncomeTable from './components/IncomeTable';
import IncomeForm from './components/IncomeForm';
import IncomeEditForm from './components/IncomeEditForm';
import NavbarHeader from './components/NavbarHeader';

function App() {

  return (
    <div className="App">
      <NavbarHeader/>
      <Routes>
        <Route index element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/income" element={<IncomeTable/>} />
        <Route path="/income/create" element={<IncomeForm/>}/>
        <Route path="/income/edit/:id" element={<IncomeEditForm />}/>
      </Routes>

      
    </div>
  )
}

export default App
