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
import { Container, Row, Form, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Chart from "chart.js/auto";

Chart.register("myCustomChartType", {
  // implementation goes here
});

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
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [deleteIncome] = useState([]);
  const [deleteExpense] = useState([]);
  const [selectedStartDate] = useState("");
  const [selectedSetEndDate] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/expenses?page=0&pageSize=10000", {
        params: {
          startDate: startDate || null,
          endDate: endDate || null,
        },
      })
      .then((response) => {
        console.log("Expense data received:", response.data.content);
        setExpenses(response.data.content);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8080/api/incomes?page=0&pageSize=10000", {
        params: {
          startDate: startDate || null,
          endDate: endDate || null,
        },
      })
      .then((response) => {
        console.log("Income data received:", response.data.conten);
        setIncomes(response.data.content);
      })
      .catch((err) => console.log(err));
  }, [startDate, endDate, deleteIncome, deleteExpense]);

  const arrayExpenses = expenses
    ? Array.from(new Set(expenses.map((expense) => expense.expenseTypeName)))
    : [];
  const arrayIncomes = incomes
    ? Array.from(new Set(incomes.map((income) => income.incomeAmount)))
    : [];
  const categories = expenses
    ? Array.from(new Set(expenses.map((expense) => expense.expenseTypeName)))
    : [];

  const selectedExpenses = expenses.reduce(
    (total, expense) => total + expense.expenseAmount,
    0
  );

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

  // const getLabels = (startDate, endDate) => {
  //   const start = moment(startDate).startOf("month");
  //   const end = moment(endDate).endOf("month");
  //   const numMonths = end.diff(start, "months") + 1;
  //   return Array(numMonths).fill().map((_, i) => start.clone().add(i, "months").format("MMM"));
  // };

  const getLabels = (startDate, numMonths) => {
    const start = startDate ? moment(startDate) : moment().startOf("year");
    const end = moment(endDate).endOf("month");
    return Array(numMonths)
      .fill()
      .map((_, i) => start.add(i, "months").format("MMM"));
  };

  const dataLine = {
    labels: getLabels(startDate, 6),
    datasets: [
      {
        type: "line",
        label: "Expenses",
        backgroundColor: "red",
        tension: 0.3,
        data:
          arrayExpenses &&
          arrayExpenses.map((category) =>
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
      },

      {
        labels: categories,

        type: "bar",
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
        backgroundColor: ["#36a2eb"],
      },
      {
        label: "Income",
        backgroundColor: "green",
        tension: 0.2,
        data:
          arrayIncomes &&
          arrayIncomes.map((incomeId) =>
            incomes
              .filter(
                (income) =>
                  income.incomeId === incomeId &&
                  (!selectedStartDate ||
                    new Date(income.incomeDatetime) >=
                      new Date(selectedStartDate)) &&
                  (!selectedSetEndDate ||
                    new Date(income.incomeDatetime) <=
                      new Date(selectedSetEndDate))
              )
              .reduce((acc, income) => acc + income.incomeAmount, 0)
          ),
      },
    ],
  };

  return (
    <Container>
      <Form.Label>Line Chart</Form.Label>
      <Row className="table-cell">
        <Row className="table-filter">
          <Col className="table-filter--size">
            <Form.Group>
              <Col>
                <Form.Label>Date from:</Form.Label>
                <DateTimePicker
                  value={startDate}
                  name="startDate"
                  format="yyyy-MM-dd"
                  className="table-filter--date"
                  onChange={handleStartDateChange}
                  disableClock={true}
                  calendarIcon={<FaCalendarAlt />}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Row className="table-filter">
          <Col className="table-filter--size">
            <Form.Group>
              <Col>
                <Form.Label>Date to:</Form.Label>
                <DateTimePicker
                  value={endDate}
                  name="endDate"
                  format="yyyy-MM-dd"
                  className="table-filter--date"
                  onChange={handleEndDateChange}
                  disableClock={true}
                  calendarIcon={<FaCalendarAlt />}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Row>
      {!expenses && <h4>Data not exist, wrong date format</h4>}
      <Line data={dataLine} />
      <Form.Group>
        <Row className="table-row">
          <Form.Label>
            Selected period Expenses : € {selectedExpenses}
          </Form.Label>

          <Form.Label>Current year Expenses :</Form.Label>
        </Row>
      </Form.Group>
    </Container>
  );
}

export default LineChart;
