import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import adminStore from './Redux/Store.js';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={adminStore}>
      <App />
    </Provider>
  </StrictMode>,
)
