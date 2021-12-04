import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import './styles/buttons.scss';
import Main from './pages/Main/Main';


const App: React.FC = (): JSX.Element => {

    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Main />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
