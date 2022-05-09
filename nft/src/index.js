import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { SnackbarProvider } from 'notistack';
import reportWebVitals from './reportWebVitals';
import dotenv from "dotenv";
dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      maxSnack={12}>
      <App />
    
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
