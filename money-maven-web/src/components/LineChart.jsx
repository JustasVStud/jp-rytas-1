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
import { Container, Row, Form, Col, Table } from "react-bootstrap";
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
  const [deleteExpense, setDeleteExpense] = useState(false);

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
      .then((response) => {
        console.log("Expense data received:", response.data.content);
        setExpenses(response.data.content);
      })
      .catch((err) => console.log(err));
  }, [startDate, endDate, deleteExpense]);

  const arrayExpenses = expenses
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
        data: expenses.map(
          (selectedExpenses) => selectedExpenses.expenseAmount
        ),
      },
    ],
  };
  return (
    <Container>
      <Form.Label>Line Chart</Form.Label>
      <Row className="row justify-center">
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
                  <Form.Label>Date until:</Form.Label>
                  <DateTimePicker
                    value={endDate}
                    name="endDate"
                    format="yyyy-MM-dd"
                    onChange={handleEndDateChange}
                    disableClock={true}
                    calendarIcon={<FaCalendarAlt />}
                    isInvalid={
                      startDate &&
                      endDate &&
                      moment(startDate).isAfter(moment(endDate))
                        ? "is-invalid"
                        : "Start date cannot be after end date"
                    }
                    className="table-filter--date"
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Row>
        {!expenses && <tr>Data not exist, wrong date format</tr>}
        <Line data={dataLine} />
        <Table class="table table">
          <tbody>
            <td class="table-active">
              <Row className="table-filter--date">
                <td class="table-Secondary">
                  Selected period expenses : € {selectedExpenses}
                </td>
              </Row>
            </td>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default LineChart;
