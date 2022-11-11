import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import AuthContextProvider from './Providers/AuthContextProvider.js';
import LoaderContextProvider from './Providers/LoaderContextProvider.js';
import { ToastContainer } from 'react-toastify';
import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <LoaderContextProvider>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
          <App />
        </LoaderContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);