import './App.scss';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import IncomePage from './pages/IncomePage';
import ExpensePage from './pages/ExpensePage';
import AddEditCategory from './components/AddEditCategory';
import IncomeEditForm from './components/IncomeEditForm';
import NavbarHeader from './components/NavbarHeader';
import CategoryTable from './components/CategoryTable';

 


function App() {
 
  return (
    
    <div className="App">
      
      <NavbarHeader/>
      <Routes>
        <Route index element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/category" element={<CategoryTable />} />
        <Route path="/category/add/" element={<AddEditCategory />} />
        <Route path="/category/add/:id" element={<AddEditCategory />} />
        <Route path="/income/edit/:id" element={<IncomeEditForm />}/>
       
      </Routes>

      
    </div>
  )
}

export default App
