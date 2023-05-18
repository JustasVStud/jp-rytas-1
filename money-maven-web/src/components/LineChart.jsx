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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [deleteExpense] = useState(false);
  const [deleteIncome] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));

    Promise.all([
      axios.get("http://localhost:8080/api/expenses", {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
        params: {
          page: 0,
          pageSize: 10000,
          startDate: startDate || null,
          endDate: endDate || null,
        },
      }),
      axios.get("http://localhost:8080/api/incomes", {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
        params: {
          page: 0,
          pageSize: 10000,
          startDate: startDate || null,
          endDate: endDate || null,
        },
      }),
    ])
      .then(([expensesResponse, incomesResponse]) => {
        console.log("Expense data received:", expensesResponse.data.content);
        console.log("Income data received:", incomesResponse.data.content);
        setExpenses(expensesResponse.data.content);
        setIncomes(incomesResponse.data.content);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [startDate, endDate, deleteExpense, deleteIncome]);

  const selectedIncomes = incomes.reduce(
    (total, income) => total + income.incomeAmount,
    0
  );

  const selectedExpenses = expenses.reduce(
    (total, expense) => total + expense.expenseAmount,
    0
  );

  const handleStartDateChange = (e) => {
    if (e != null) {
      setStartDate(moment(e).format("YYYY-MM-DDTHH:mm:ss"));
    } else {
      setStartDate(null);
    }
  };

  const handleEndDateChange = (e) => {
    if (e != null) {
      setEndDate(moment(e).format("YYYY-MM-DDTHH:mm:ss"));
    } else {
      setEndDate(null);
    }
  };

  const getLabels = (startDate, endDate) => {
    const start = startDate ? moment(startDate) : moment().startOf("year");
    const end = endDate
      ? moment(endDate).endOf("month")
      : moment().endOf("month");
    const numMonths = end.diff(start, "months") + 1;
    return Array(numMonths)
      .fill()
      .map((_, i) => start.clone().add(i, "months").format("MMM"));
  };

  const dataLine = {
    labels: getLabels(startDate, endDate),
    datasets: [
      {
        type: "line",
        label: "Expenses",
        backgroundColor: "red",
        tension: 0.3,
        fill: false,
        data: expenses.map(
          (selectedExpenses) => selectedExpenses.expenseAmount
        ),
      },
      {
        type: "line",
        label: "Income",
        backgroundColor: "green",
        tension: 0.3,
        fill: false,
        data: incomes.map((selectedIncomes) => selectedIncomes.incomeAmount),
      },
    ],
  };
  return (
    <Container>
      <Form.Label>Expenses Chart</Form.Label>
      <Row className="row justify-center">
        <Row className="table-cell">
          <Row className="table-filter">
            <Col className="table-filter--size">
              <Form.Group>
                <Col>
                  <Form.Label>Date from:</Form.Label>
                  <DateTimePicker
                    value={startDate}
                    minDate={moment(startDate).toDate()}
                    maxDate={moment().toDate(endDate)}
                    name="startDate"
                    format="yyyy-MM-dd"
                    onChange={handleStartDateChange}
                    disableClock={true}
                    calendarIcon={<FaCalendarAlt />}
                    disableDaysBeforeToday={true}
                    className="table-filter--date"
                    useCurrent={false}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row className="table-filter">
            <Col className="table-filter--size">
              <Form.Group>
                <Col>
                  <Form.Label>Date until:</Form.Label>
                  <DateTimePicker
                    value={endDate}
                    minDate={moment(startDate).toDate()}
                    maxDate={moment().toDate()}
                    name="endDate"
                    format="yyyy-MM-dd"
                    onChange={handleEndDateChange}
                    disableClock={true}
                    calendarIcon={<FaCalendarAlt />}
                    disableDaysBeforeToday={true}
                    className="table-filter--date"
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Row>
        <table className="table">
          {!expenses && <tr>Data not exist, wrong date format</tr>}
        </table>
        </Row>
        <Line data={dataLine} />
      <table className="table">
        <thead>
          <tr className="table-row"></tr>
        </thead>
        <tbody>
          <tr className="table-row">
            <td className="table-cell table-button">
              Selected period expenses:
            </td>
            <td className="table-cell table-button">€ {selectedExpenses}</td>
          </tr>
        </tbody>
        <tbody>
          <tr className="table-row">
            <td className="table-cell table-button">
              Selected incomes period :
            </td>
            <td className="table-cell table-button">€ {selectedIncomes}</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}

export default LineChart;
