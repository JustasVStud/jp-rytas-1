import axios from 'axios';
import authHeader from './auth-header';

const BASE_URL = 'http://localhost:8080/api/calculations';

export const getExpenseTotal = async (
    selectedExpenseType,
    startDate,
    endDate
  ) => {
    try {
      const response = await axios.get(`${BASE_URL}/expense`, {
        headers: authHeader(),
        params: {
          expenseTypeName: selectedExpenseType || null,
          startDate: startDate || null,
          endDate: endDate || null,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getIncomeTotal = async (
    startDate,
    endDate
  ) => {
    try {
      const response = await axios.get(`${BASE_URL}/income`, {
        headers: authHeader(),
        params: {
          startDate: startDate || null,
          endDate: endDate || null,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };