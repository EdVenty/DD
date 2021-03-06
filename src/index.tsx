import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContext, auth, provider, db} from './fire';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalAuthNeededProvider } from './useAuthNeededProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthContext.Provider value={{
      auth, provider, db
    }}>
      <Router>
        <GlobalAuthNeededProvider>
          <App />
        </GlobalAuthNeededProvider>
      </Router>
    </AuthContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
