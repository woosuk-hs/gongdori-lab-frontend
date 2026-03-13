import { createRoot } from 'react-dom/client'
import '../index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from "@components/ScrollToTop.tsx";
import {HelmetProvider} from "react-helmet-async";

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </HelmetProvider>
)
