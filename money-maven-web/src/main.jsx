import React from 'react'
import { render } from "react-dom";
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './assets/react-confirm-alert.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = document.getElementById("root");
render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    root);
