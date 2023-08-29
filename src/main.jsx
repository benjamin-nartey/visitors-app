import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/context/useAuth.context';
import { CheckOutToggleProvider } from './components/context/checkoutToggle.context';
import App from './App';
import './index.css';
import 'react-tooltip/dist/react-tooltip.css';
import { ReportContextProvider } from './routes/reports/context/report.context';
import { AdminContextProvider } from './routes/admin/context/admin.context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CheckOutToggleProvider>
          <ReportContextProvider>
            <AdminContextProvider>
              <App />
            </AdminContextProvider>
          </ReportContextProvider>
        </CheckOutToggleProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
