import { Line, Doughnut } from "react-chartjs-2";
import {Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,ArcElement } from "chart.js";
import { Container, Button, Table, Row, Form, Col } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
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
  const [deleteExpense, setDeleteExpense] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/expenses")
      .then((response) => setExpenses(response.data))
      .catch((err) => console.log(err));
  }, [deleteExpense]);

  const categories = Array.from(
    new Set(expenses.map((expense) => expense.expenseTypeName))
  );

  
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const handleFilter = () => {
    if (selectedCategory) {
      setExpenses(
        expenses.filter(
          (expense) => expense.expenseTypeName === selectedCategory
        )
      );
    }
  };

  const handleClearFilter = () => {
    setSelectedCategory("");
    axios
      .get("http://localhost:8080/api/expenses")
      .then((response) => setExpenses(response.data))
      .catch((err) => console.log(err));
  };


  const [chartType, setChartType] = useState("Line");

  const expenseTotal = expenses.reduce((acc, cur) => acc + cur.expenseTotal, 0);
  const expenseTypeName = expenses.length;

  const dataLine = {
    labels: expenses.map((expense) => expense.month),
    datasets: [
      {
        label: "Expenses",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: "green",
        tension: 0.2,
      },
    ],
  };

  const dataDoughnut = {
    labels: ["Expenses"],
    datasets: [
      {
        data: [expenseTypeName, expenseTotal],
        backgroundColor: ["green", "red"],
        borderWidth: 2,
        spacing: 0.5,
        offset: 8,
      },
    ],
  };

  const toggleChartType = () => {
    setChartType(chartType === "Line" ? "Doughnut" : "Line");
  };
  

  return (
    <Container style={{
      background: "#ffff",
      border: "1px solid #ffffff",
      boxShadow: "0px 1px 15px rgba(0, 0, 0, 0.06)",
      padding: "2.5rem",
      borderRadius: "20px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <div className="form-style">
      <Row className="form-buttons-container">
      <Col className='table-filter--sort'>
            <tr className="form-buttons-container">
              <td>
                <Button
                  variant={selectedCategory ? "secondary" : "primary"}
                  onClick={selectedCategory ? handleClearFilter : handleFilter}
                >
                  {selectedCategory ? "Clear filter" : "Filter"}
                </Button>
              </td>
              <td>
              
                <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
                
              </td>
            </tr>
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
