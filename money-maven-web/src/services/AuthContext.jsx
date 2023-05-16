import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    return axios
      .post(API_URL + 'signin', { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          const userData = {
            userId: response.data.userId,
            username: response.data.username,
            authorities: response.data.authorities,
            tokenType: response.data.tokenType,
            accessToken: response.data.accessToken
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        }
        return response.data;
      });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = (username, password) => {
    return axios.post(API_URL + 'signup', {
      username,
      password,
      isAdmin: false
    });
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, getCurrentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
