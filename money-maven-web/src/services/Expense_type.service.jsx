import axios from 'axios';
import authHeader from './auth-header';

const BASE_URL = 'http://localhost:8080/api/expenseTypes';

export const getExpenseTypes = async() => {
    try {
        const response = await axios.get(BASE_URL, {
            headers: authHeader()
        })
        return response.data;
    } catch (error) {
        throw error;
    }
};