import React from 'react';

import ReactDOM from 'react-dom/client';

import 'services/i18n';

import { AddressProvider } from 'context/AddressContext';
import { VehiclesProvider } from 'context/VehiclesContext';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <VehiclesProvider>
      <AddressProvider>
        <App />
      </AddressProvider>
    </VehiclesProvider>
  </React.StrictMode>,
);
