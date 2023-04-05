import React from 'react'
import { render } from "react-dom";
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = document.getElementById("root");
render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    root);
