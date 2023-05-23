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
import { Container, Row, Form, Col, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { getExpenses } from '../services/Expense.service';
import { getIncomes } from '../services/Income.service';

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
  const [incomes, setIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setIsLoading(true);
        const { content } = await getExpenses(
          0,
          10000,
          startDate,
          endDate
        );
        setExpenses(content);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchExpenses();
  }, [startDate,endDate]);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        setIsLoading(true);
        const { content } = await getIncomes(
          0,
          10000,
          startDate,
          endDate
        );
        setIncomes(content);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchIncomes();
  }, [startDate,endDate]);


  const selectedIncomes =
    incomes && incomes.length > 0
      ? incomes.reduce((total, income) => total + income.incomeAmount, 0)
      : 0;

  const selectedExpenses =
    expenses && expenses.length > 0
      ? expenses.reduce((total, expense) => total + expense.expenseAmount, 0)
      : 0;

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
        borderColor: "red",
        pointBackgroundColor: "red",
        pointHoverBackgroundColor: "red",
        tension: 0.2,
        data:
          expenses && expenses.length > 0
            ? expenses.map((expense) => expense.expenseAmount)
            : [0],
        pointRadius: 3,
      },
      {
        type: "line",
        label: "Income",
        backgroundColor: "green",
        borderColor: "green",
        pointBackgroundColor: "green",
        pointHoverBackgroundColor: "green",
        tension: 0.2,
        data:
          incomes && incomes.length > 0
            ? incomes.map((income) => income.incomeAmount)
            : [0],
        pointRadius: 3,
      },
    ],
  };

  return (
    <Container>
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
                    
                    calendarIcon={<FaCalendarAlt />}
                    name="endDate"
                    format="yyyy-MM-dd"
                    onChange={handleEndDateChange}
                    disableClock={true}
                    disableDaysBeforeToday={true}
                    className="table-filter--date"
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Row>
      </Row>

      {isLoading ? (
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        ) : (
          <>
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
                  <td className="table-cell table-button">€ {selectedIncomes} </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
    </Container>
  );
}

export default LineChart;
