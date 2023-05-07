import './App.scss';
import { Route, Routes } from 'react-router-dom';
import IncomeTable from './components/IncomeTable';
import IncomeForm from './components/IncomeForm';
import IncomeEditForm from './components/IncomeEditForm';
import ExpenseTable from './components/ExpenseTable'
import ExpenseForm from './components/ExpenseForm';
import ExpenseEditForm from './components/ExpenseEditForm';
import CategoryTable from './components/CategoryTable';
import AddEditCategory from './components/AddEditCategory';
import NavbarHeader from './components/NavbarHeader';
import DoughnutChart from './components/DoughnutChart';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

 


function App() {
 
  return (
    
    <div className="App">
      
      <NavbarHeader/>
      <Routes>
        <Route index element={<LoginForm/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/income" element={<IncomeTable />} />
        <Route path="/income/create" element={<IncomeForm/>}/>
        <Route path="/income/edit/:id" element={<IncomeEditForm />}/>
        <Route path="/expense" element={<ExpenseTable />} />
        <Route path="/expense/create" element={<ExpenseForm/>}/>
        <Route path="/expense/edit/:id" element={<ExpenseEditForm />}/>
        <Route path="/category" element={<CategoryTable />} />
        <Route path="/category/add/" element={<AddEditCategory />} />
        <Route path="/category/add/:id" element={<AddEditCategory />} />
        <Route path="/doughnut" element={<DoughnutChart />} />
      </Routes>

      
    </div>
  )
}

export default App
