import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Container, Button, Row, Form, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function ExpenseCharts() {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [deleteExpense] = useState([]);
  const [deleteIncome] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/expenses")
      .then((response) => setExpenses(response.data))
      .catch((err) => console.log(err));
  }, [deleteExpense, deleteIncome, selectedMonth, selectedCategory]);

  function expensesByMonth(expenses) {
    const expensesByMonth = {};

    expenses.forEach((expense) => {
      const month = new Date(expense.expenseDatetime).getMonth();
      if (expensesByMonth[month]) {
        expensesByMonth[month] += expense.expenseAmount;
      } else {
        expensesByMonth[month] = expense.expenseAmount;
      }
    });

    return expensesByMonth;
  }

  const categories = Array.from(
    new Set(expenses.map((expense) => expense.expenseTypeName))
  );

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleFilter = () => {
    let url = "http://localhost:8080/api/expenses";
    if (selectedCategory) {
      url += `?expenseType=${selectedCategory}`;
    }
    if (selectedMonth) {
      url += `${selectedCategory ? "&" : "?"}month=${selectedMonth}`;
    }
    axios
      .get(url)
      .then((response) => setExpenses(response.data))
      .catch((err) => console.log(err));
  };

  const handleClearFilter = () => {
    setSelectedCategory("");
    setSelectedMonth("");
    axios
      .get("http://localhost:8080/api/expenses")
      .then((response) => setExpenses(response.data))
      .catch((err) => console.log(err));
  };

  const handleClearMonthFilter = () => {
    setSelectedMonth("");
    handleFilter();
  };

  const [chartType, setChartType] = useState("Line");

  const expensesByCategoryAndMonth = expenses.reduce((acc, expense) => {
    const month = new Date(expense.expenseDatetime).getMonth();
    if (selectedMonth && month !== parseInt(selectedMonth)) {
      return acc;
    }

const key = `${expense.expenseTypeName}-${month}`;
if (!acc[key]) {
  acc[key] = {
    category: expense.expenseTypeName,
    month: expense.month,
    total: 0,
  };
}
acc[key].total += expense.expenseAmount;
return acc;
  }, {});

  const dataLine = {
    labels: Object.keys(expensesByCategoryAndMonth).map((key) => {
    const { month, category } = expensesByCategoryAndMonth[key];
    return `${month} - ${category}`;
    }),
    datasets: [
    {
    label: "Expenses",
    data: Object.values(expensesByCategoryAndMonth).map(
    (data) => data.total
    ),
    backgroundColor: "green",
    tension: 0.2,
    },
    ],
    };
    
    const dataDoughnut = {
    labels: categories,
    datasets: [
    {
    data: categories.map((category) =>
    expenses.reduce(
    (acc, expense) =>
    expense.expenseTypeName === category
    ? acc + expense.expenseAmount
    : acc,
    0
    )
    ),
    backgroundColor: ["green", "red", "blue", "brown", "yellow"],
    borderWidth: 2,
    spacing: 0.5,
    offset: 8,
    },
    ],
    };
    
    const toggleChartType = () => {
    setChartType((chartType) => (chartType === "Line" ? "Doughnut" : "Line"));
    };
    
    return (
    <Container
    style={{
    background: "#ffff",
    border: "1px solid #ffffff",
    boxShadow: "0px 1px 15px rgba(0, 0, 0, 0.06)",
    padding: "2.5rem",
    borderRadius: "20px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    }}
    >
    <div className="form-style">
    <Row className="form-buttons-container">
    <Col className="table-filter--sort">
    <Button
    variant={selectedCategory ? "secondary" : "primary"}
    onClick={selectedCategory ? handleClearFilter : handleFilter}
    className="button-clear-filter"
    >
    {selectedCategory ? "Clear Filter" : "Filter"}
    </Button>
            <Form.Select
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>

            <Button
              variant={selectedMonth ? "secondary" : "primary"}
              onClick={selectedMonth ? handleClearMonthFilter : handleFilter}
            >
              {selectedMonth ? "Clear filter" : "Filter"}
            </Button>

            <Form.Select value={selectedMonth} onChange={handleMonthChange}>
              <option value="">Select Month</option>
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </div>
      <Button onClick={toggleChartType}>
        {chartType === "Line" ? "Switch to Doughnut" : "Switch to Line"}
      </Button>
      {chartType === "Line" ? (
        <Line data={dataLine} />
      ) : (
        <Doughnut data={dataDoughnut} />
      )}
    </Container>
  );
}

export default ExpenseCharts;
