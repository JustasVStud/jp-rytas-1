import "./App.scss";
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './services/AuthContext';
import ProtectedRoutes from './services/ProtectedRoutes';
import IncomeList from "./components/income/IncomeList";
import IncomeForm from "./components/income/IncomeForm";
import IncomeEditForm from "./components/income/IncomeEditForm";
import ExpenseList from "./components/expense/ExpenseList";
import ExpenseForm from "./components/expense/ExpenseForm";
import ExpenseEditForm from "./components/expense/ExpenseEditForm";
import CategoryTable from "./components/expense_type/CategoryTable";
import AddEditCategory from "./components/expense_type/AddEditCategory";
import NavbarHeader from "./components/NavbarHeader";
import DoughnutChart from "./components/DoughnutChart";
import LineChart from "./components/LineChart";
import LoginForm from "./components/user/LoginForm";
import RegisterForm from "./components/user/RegisterForm";
import ProfilePage from "./components/user/ProfilePage";
import AdminRoutes from './services/AdminRoutes';
import BudgetList from './components/budget/BudgetList';
import BudgetForm from './components/budget/BudgetForm';
import BudgetEditForm from './components/budget/BudgetEditForm';
import IncomeDesktop from './components/income/IncomeDesktop';
import ExpenseDesktop from './components/expense/ExpenseDesktop';

function App() {
  const [windowWidth] = useState(window.innerWidth);
  return (
    <AuthProvider>
      <div className="App">
        <NavbarHeader />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route element={<ProtectedRoutes/>}>

            <Route path="/profile" element={<ProfilePage />} exact/>
            {windowWidth < 768 ? (
              <>
              <Route path="/income" element={<IncomeList />} exact/>
              <Route path="/expense" element={<ExpenseList />} exact/>
              </>
            ) : (
              <>
              <Route path="/income" element={<IncomeDesktop />} exact/>
              <Route path="/expense" element={<ExpenseDesktop />} exact/>
              </>
            )}
            <Route path="/income/create" element={<IncomeForm />} exact/>
            <Route path="/income/edit/:id" element={<IncomeEditForm />} exact/>
            <Route path="/expense/create" element={<ExpenseForm />} exact/>
            <Route path="/expense/edit/:id" element={<ExpenseEditForm />} exact/>
            <Route path="/budget" element={<BudgetList />} exact/>
            <Route path="/budget/create" element={<BudgetForm />} exact/>
            <Route path="/budget/edit/:id" element={<BudgetEditForm />} exact/>
            <Route path="/doughnut" element={<DoughnutChart />} exact/>
            <Route path="/line" element={<LineChart />} exact/>
            <Route element={<AdminRoutes/>}>
              <Route path="/category" element={<CategoryTable />} exact/>
              <Route path="/category/add" element={<AddEditCategory />} exact/>
              <Route path="/category/edit/:id" element={<AddEditCategory />} exact/>
            </Route>
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
