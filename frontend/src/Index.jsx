import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Header/>
        <App className="pb-16"/>
        <Footer/>
    </React.StrictMode>
);