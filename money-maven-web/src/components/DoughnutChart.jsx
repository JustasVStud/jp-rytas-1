import { Doughnut } from "react-chartjs-2";
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
import DateTimePicker from "react-datetime-picker";
import { FaCalendarAlt } from "react-icons/fa";
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

function DoughnutChart() {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonthFrom, setSelectedMonthFrom] = useState("");
  const [selectedMonthTo, setSelectedMonthTo] = useState("");
  const [deleteExpense] = useState([]);
  const [deleteIncome] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/expenses`, {})
      // .get(`http://localhost:8080/api/expenses?limit=1000`)
      .then((response) => setExpenses(response.data))
      .catch((err) => console.log(err));
  }, [
    deleteExpense,
    deleteIncome,
    selectedMonthFrom,
    selectedMonthTo,
    selectedCategory,
  ]);

  const categories = Array.from(
    new Set(expenses.map((expense) => expense.expenseTypeName))
  );
  const handleMonthFromChange = (date) => {
    const month = date.getMonth();
    setSelectedMonthFrom(month);
  };

  const handleMonthToChange = (date) => {
    const month = date.getMonth();
    setSelectedMonthTo(month);
  };

  const handleFilter = () => {
    let url = "http://localhost:8080/api/expenses";
    if (selectedCategory) {
      url += `?expenseTypeName=${selectedCategory}`;
    }
    if (selectedMonthFrom && selectedMonthTo) {
      url += `${
        selectedCategory ? "&" : "?"
      }monthFrom=${selectedMonthFrom}&monthTo=${selectedMonthTo}`;
    }
    axios
      .get(url)
      .then((response) => setExpenses(response.data))
      .catch((err) => console.log(err));
  };


  const handleClearMonthFilter = () => {
    setSelectedMonthFrom("");
    setSelectedMonthTo("");
    handleFilter();
    axios
      .get("http://localhost:8080/api/expenses")
      .then((response) => setExpenses(response.data))
      .catch((err) => console.log(err));
  };

  const expensesByCategoryAndMonth = expenses.reduce((acc, expense) => { 
    const month = new Date(expense.expenseDatetime).getMonth();
    const category = expense.expenseTypeName;
  
    if (
      (selectedMonthFrom && month < selectedMonthFrom) ||
      (selectedMonthTo && month > selectedMonthTo) ||
      (selectedCategory && category !== selectedCategory)
    ) 
    {
      return acc;
    }
  
    if (!acc[category]) {
      acc[category] = {};
    }
    if (!acc[category][month]) {
      acc[category][month] = {
        total: 0,
      };
    }
    acc[category][month].total += expense.expenseAmount;
  
    return acc;
  }, {});

  const dataDoughnut = {
    labels:  Object.keys(expensesByCategoryAndMonth),
    datasets: [
      {
        label: "Expenses by category",
        data:
         categories.map((category) =>
          expenses
            .filter(
              (expense) =>
                expense.expenseTypeName === category &&
                (!selectedMonthFrom ||
                  new Date(expense.expenseDatetime) >=
                    new Date(selectedMonthFrom)) &&
                (!selectedMonthTo ||
                  new Date(expense.expenseDatetime) <=
                    new Date(selectedMonthTo))
            )
            .reduce((acc, expense) => acc + expense.expenseAmount, 0),
        ),
        
        backgroundColor: [
          "#ffcd56",
          "#ff6384",
          "#36a2eb",
          "#fd6b19",
          "#4BC0C0",
          "#9966FF",
          "#C9CBCF",
          "#CCD1D1",
          "#ffcd56",
          "#ff6384",
          "#36a2eb",
          "#fd6b19",
          "#4BC0C0",
          "#9966FF",
          "#C9CBCF",
          "#CCD1D1",
          "#ffcd56",
          "#ff6384",
          "#36a2eb",
          "#fd6b19",
          "#4BC0C0",
          "#9966FF",
          "#C9CBCF",
          "#CCD1D1",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8B008B",
          "#ADFF2F",
          "#00BFFF",
          "#FFA07A",
          "#20B2AA",
          "#00FFFF",
        ],
      },
    ],
  };

  return (
<Container>
<Row className="justify-content-center">
<Col xs={12} md={6}>
<Form.Label>Doughnut Chart</Form.Label>
<Form.Group>
<Form.Label>Date from</Form.Label>
<DateTimePicker
onChange={handleMonthFromChange}
value={selectedMonthFrom ? new Date(2023, selectedMonthFrom) : null}
className="form-control"
format="MM/yyyy"
disableClock={true}
calendarIcon={<FaCalendarAlt />}
/>
</Form.Group>
<Form.Group>
<Form.Label>Date to</Form.Label>
<DateTimePicker
onChange={handleMonthToChange}
value={selectedMonthTo ? new Date(2023, selectedMonthTo) : null}
className="form-control"
format="MM/yyyy"
disableClock={true}
calendarIcon={<FaCalendarAlt />}
/>
</Form.Group>
<Row className="form-buttons-container">
<Col className="table-filter--sort">
<Button className="mr-2" onClick={handleClearMonthFilter}>
Clear date filter
</Button>
</Col>
</Row>
</Col>
</Row>
<Row className="justify-content-center mt-5">
<Col xs={12} md={6}>
</Col>
</Row>
<Doughnut data={dataDoughnut} />
</Container>
  );
}

export default DoughnutChart;
