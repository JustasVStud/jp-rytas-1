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
import { Container, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { getExpenses } from '../services/Expense.service';
import { getIncomes } from '../services/Income.service';
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

function LineChart() {
  const [expenses, setExpenses] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [incomes, setIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { content: incomeContent } = await getIncomes(
          0,
          10000,
          null,
          startDate,
          endDate,
        );
        setIncomes(incomeContent);
        
        const { content: expenseContent } = await getExpenses(
          0,
          10000,
          null,
          null,
          startDate,
          endDate,
        );
        setExpenses(expenseContent);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [startDate, endDate]);


  const selectedIncomes =
    incomes && incomes.length > 0
      ? incomes.reduce((total, income) => total + income.incomeAmount, 0).toFixed(2)
      : 0;

  const selectedExpenses =
    expenses && expenses.length > 0
      ? expenses.reduce((total, expense) => total + expense.expenseAmount, 0).toFixed(2)
      : 0;

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

  const getLabels = (startDate, endDate) => {
    const start = startDate ? moment(startDate) : moment().startOf("year");
    const end = endDate
      ? moment(endDate).endOf("month")
      : moment().endOf("month");
    const numMonths = end.diff(start, "months");
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
        <DateFilterSelect
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />

      {isLoading ? (
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        ) : (
          <>
            <Line data={dataLine} />
            <div className='balance-totals'>
              <div>Selected period expenses:</div>
              <div>€ {selectedExpenses}</div>
            </div>
            <div className='balance-totals'>
              <div>Selected period incomes:</div>
              <div>€ {selectedIncomes}</div>
            </div>
          </>
        )}
    </Container>
  );
}

export default LineChart;
