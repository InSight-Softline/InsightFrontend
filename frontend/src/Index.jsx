import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Header from './pages/Header/Header.jsx'
import Footer from './pages/Footer/Footer.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Header/>
        <App className="pb-16"/>
        <Footer/>
    </React.StrictMode>
);