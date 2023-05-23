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
import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import DateFilterSelect from './DateFilterSelect';

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
  const [selectedCategory] = useState("");
  const [selectedStartDate] = useState("");
  const [selectedSetEndDate] = useState("");
  const [deleteExpense] = useState([]);
  const [deleteIncome] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));
    axios
      .get("http://localhost:8080/api/expenses?page=0&pageSize=10000", {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
        params: {
          startDate: startDate || null,
          endDate: endDate || null,
        },
      })
      .then((response) => setExpenses(response.data.content))
      .catch((err) => console.log(err));
  }, [deleteExpense, deleteIncome, selectedCategory, startDate, endDate]);

  const categories = expenses
    ? Array.from(new Set(expenses.map((expense) => expense.expenseTypeName)))
    : [];

  const handleStartDateChange = (e) => {
    if (e != null) {
      setStartDate(moment(e).format("YYYY-MM-DDTHH:mm:ss"));
    } else {
      setStartDate(e);
    }
  };

  const handleEndDateChange = (e) => {
    if (e != null) {
      setEndDate(moment(e).format("YYYY-MM-DDTHH:mm:ss"));
    } else {
      setEndDate(e);
    }
  };
  const dataDoughnut = {
    labels: categories,
    datapoints: "1,2,3",
    datasets: [
      {
        label: "Expenses by category",
        data:
          categories &&
          categories.map((category) =>
            expenses
              .filter(
                (expense) =>
                  expense.expenseTypeName === category &&
                  (!selectedStartDate ||
                    new Date(expense.expenseDatetime) >=
                      new Date(selectedStartDate)) &&
                  (!selectedSetEndDate ||
                    new Date(expense.expenseDatetime) <=
                      new Date(selectedSetEndDate))
              )
              .reduce((acc, expense) => acc + expense.expenseAmount, 0)
          ),

        backgroundColor: [
          "#ffcd56",
          "#ff6384",
          "#36a2eb",
          "#fd6b19",
          "#4BC0C0",
          "#9966FF",
          "#C9CBCF",
          "#8B008B",
          "#9966FF",
          "#00FFFF",
          "#20B2AA",
        ],
        hoverBackgroundColor: ["#C9CBCF"],
      },
    ],
  };

  return (
    <Container>
        <DateFilterSelect
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
      {!expenses && <h4>Data not exist, wrong date format</h4>}
      <Doughnut data={dataDoughnut} />
    </Container>
  );
}
export default DoughnutChart;
