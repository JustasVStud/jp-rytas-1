import { Line } from "react-chartjs-2";
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

function LineChart() {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonthFrom, setSelectedMonthFrom] = useState("");
  const [selectedMonthTo, setSelectedMonthTo] = useState("");
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
    "All",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/expenses")
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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const dateChange = (e) => {
    setSelectedMonthFrom(e.target.value);
    setSelectedMonthTo(e.target.value);
  };

  const handleFilter = () => {
    let url = "http://localhost:8080/api/expenses";
    if (selectedCategory) {
      url += `?expenseTypeName=${selectedCategory}`;
    }
    if (selectedMonthFrom) {
      const monthIndexFrom = months.indexOf(selectedMonthFrom);

      url += `${selectedCategory ? "&" : "?"}month=${monthIndexFrom}`;
    }
    axios
      .get(url)
      .then((response) => setExpenses(response.data))
      .catch((err) => console.log(err));
  };

  const handleClearFilter = () => {
    setSelectedCategory("");
    setSelectedMonthFrom("");
    setSelectedMonthTo("");
    axios
      .get("http://localhost:8080/api/expenses")
      .then((response) => setExpenses(response.data))
      .catch((err) => console.log(err));
  };

  const handleClearMonthFilter = () => {
    setSelectedMonthFrom("");
    setSelectedMonthTo("");
    handleFilter();
  };

  const expensesByCategoryAndMonth = expenses.reduce((acc, expense) => {
    const month = new Date(expense.expenseDatetime).getMonth();
    const category = expense.expenseTypeName;

    if (selectedMonthFrom && month !== parseInt(selectedMonthFrom)) {
      return acc;
    }

    if (selectedCategory && category !== selectedCategory) {
      return acc;
    }

    const key = selectedCategory ? `${category}-${month}` : `${month}`;

    if (!acc[key]) {
      acc[key] = {
        category: selectedCategory ? category : null,
        monthFrom: selectedMonthFrom ? parseInt(selectedMonthFrom) : month,
        monthTo: selectedMonthTo ? parseInt(selectedMonthTo) : month,
        total: 0,
      };
    }
    if (!selectedCategory || selectedCategory === category) {
      acc[key].total += expense.expenseAmount;
    }

    return acc;
  }, {});

  const dataLine = {
    labels: Object.keys(expensesByCategoryAndMonth).map((key) => {
      const { month, year, category } = expensesByCategoryAndMonth[key];
      const monthNames = [
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
      return `${monthNames[month - 1]} ${year} - ${category}`;
    }),

    datasets: [
      {
        label: "Expenses",
        data: Object.values(expensesByCategoryAndMonth).map(
          (data) => data.total
        ),
        backgroundColor: "red",
        tension: 0.2,
        options: {
          scales: {
            y: {
              ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, ticks) {
                  return "$" + value;
                },
              },
            },
          },
        },
      },
    ],
  };

  return (
    <Container>
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
                as="select"
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
                variant={selectedMonthFrom ? "secondary" : "primary"}
                onClick={
                  selectedMonthFrom ? handleClearMonthFilter : handleFilter
                }
              >
                {selectedMonthFrom ? "Clear filter" : "Filter"}
              </Button>

              <Form.Select value={selectedMonthFrom} onChange={dateChange}>
                <option value="">Select From</option>
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </Form.Select>
              <Form.Select value={selectedMonthFrom} onChange={dateChange}>
                <option value="">Select To</option>
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </div>
        <Line data={dataLine} />
      </Container>
    </Container>
  );
}

export default LineChart;
