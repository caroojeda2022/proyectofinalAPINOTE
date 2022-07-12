import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import noteSearch from './components/noteSearch/noteSearch';
import noteCreate from './components/noteCreate/noteCreate';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';

import './App.css';

function App() {
    return (
        <div className='app'>
            <Header />
            <Routes>
                <Route path='/' element={<noteSearch />} />
                <Route path='/signup' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/new' element={<noteCreate />} />
                <Route path='*' element={<noteSearch />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
