import "./App.scss";
import { Route, Routes } from "react-router-dom";
import IncomeList from "./components/income/IncomeList";
import IncomeForm from "./components/income/IncomeForm";
import IncomeEditForm from "./components/income/IncomeEditForm";
import ExpenseTable from "./components/expense/ExpenseTable";
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

function App() {
  return (
    <div className="App">
      <NavbarHeader />
      <Routes>
        <Route index element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/income" element={<IncomeList />} />
        <Route path="/income/create" element={<IncomeForm />} />
        <Route path="/income/edit/:id" element={<IncomeEditForm />} />
        <Route path="/expense" element={<ExpenseTable />} />
        <Route path="/expense/create" element={<ExpenseForm />} />
        <Route path="/expense/edit/:id" element={<ExpenseEditForm />} />
        <Route path="/category" element={<CategoryTable />} />
        <Route path="/category/add/" element={<AddEditCategory />} />
        <Route path="/category/add/:id" element={<AddEditCategory />} />
        <Route path="/doughnut" element={<DoughnutChart />} />
        <Route path="/line" element={<LineChart />} />
      </Routes>
    </div>
  );
}

export default App;
