import React from 'react';
import { render } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import './assets/react-confirm-alert.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import App from './App';


const root = document.getElementById("root");
render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    root);
