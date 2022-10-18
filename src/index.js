import es_ES from 'antd/lib/locale/es_ES';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'assets/styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { ConfigProvider } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme';
import App from './App';
import reportWebVitals from './reportWebVitals';

if (['production', 'prod'].includes(process.env.NODE_ENV))
  disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ConfigProvider locale={es_ES}>
            <App />
          </ConfigProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
