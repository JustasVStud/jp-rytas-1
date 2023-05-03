import './App.scss';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import IncomeTable from './components/IncomeTable';
import IncomeForm from './components/IncomeForm';
import IncomeEditForm from './components/IncomeEditForm';
import ExpenseTable from './components/ExpenseTable'
import ExpenseForm from './components/ExpenseForm';
import ExpenseEditForm from './components/ExpenseEditForm';
import CategoryTable from './components/CategoryTable';
import AddEditCategory from './components/AddEditCategory';
import NavbarHeader from './components/NavbarHeader';
import LineChart from './components/LineChart';


 


function App() {
 
  return (
    
    <div className="App">
      
      <NavbarHeader/>
      <Routes>
        <Route index element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/income" element={<IncomeTable />} />
        <Route path="/income/create" element={<IncomeForm/>}/>
        <Route path="/income/edit/:id" element={<IncomeEditForm />}/>
        <Route path="/expense" element={<ExpenseTable />} />
        <Route path="/expense/create" element={<ExpenseForm/>}/>
        <Route path="/expense/edit/:id" element={<ExpenseEditForm />}/>
        <Route path="/category" element={<CategoryTable />} />
        <Route path="/category/add/" element={<AddEditCategory />} />
        <Route path="/category/add/:id" element={<AddEditCategory />} />
        <Route path="/line" element={<LineChart />} />
        
       
      </Routes>

      
    </div>
  )
}

export default App
