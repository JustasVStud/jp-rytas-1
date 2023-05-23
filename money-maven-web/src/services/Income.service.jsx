import axios from 'axios';
import authHeader from './auth-header';

const BASE_URL = 'http://localhost:8080/api/incomes';

export const getIncomes = async (page, pageSize, sortDirection, startDate, endDate) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: authHeader(),
      params: {
        page: page,
        pageSize: pageSize,
        direction: sortDirection,
        startDate: startDate || null,
        endDate: endDate || null,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getIncome = async (incomeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${incomeId}`, {
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createIncome = async (incomeData) => {
  try {
    const response = await axios.post(BASE_URL, incomeData, {
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchIncome = async (incomeId, incomeData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${incomeId}`, incomeData, {
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteIncome = async (incomeId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${incomeId}`, {
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
