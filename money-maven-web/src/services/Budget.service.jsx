import axios from 'axios';
import authHeader from './auth-header';

const BASE_URL = 'http://localhost:8080/api/budgets';

export const getBudgets = async (page, pageSize, sortDirection) => {
    try {
      const response = await axios.get(BASE_URL, {
        headers: authHeader(),
        params: {
          page: page,
          pageSize: pageSize,
          direction: sortDirection,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getBudget = async (budgetId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${budgetId}`, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  export const createBudget = async (budgetData) => {
    try {
      const response = await axios.post(BASE_URL, budgetData, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const patchBudget = async (budgetId, budgetData) => {
    try {
      const response = await axios.patch(`${BASE_URL}/${budgetId}`, budgetData, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const deleteBudget = async (budgetId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${budgetId}`, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };