import axios from 'axios';
import authHeader from './auth-header';

const BASE_URL = 'http://localhost:8080/api/expenses';

export const getExpenses = async (
    currentPage,
    pageSize,
    sortDirection,
    selectedExpenseType,
    startDate,
    endDate
  ) => {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        headers: authHeader(),
        params: {
          page: currentPage,
          pageSize: pageSize,
          direction: sortDirection,
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

export const getExpense = async (expenseId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${expenseId}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createExpense = async (expenseData) => {
    try {
        const response = await axios.post(BASE_URL, expenseData, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const patchExpense = async (expenseId, expenseData) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${expenseId}`, expenseData, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteExpense = async (expenseId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${expenseId}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};