import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import './styles/buttons.scss';
import Main from './pages/Main/Main';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout/Layout';
import { AuthContext } from './contexts/auth-context';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import Profile from './pages/Profile/Profile';

const App: React.FC = (): JSX.Element => {
    const {userID, token, login, logout} = useAuth();

    const isAuthorized = !!token;

    return (
        <div className='App'>
            <BrowserRouter>
                <AuthContext.Provider value={{userID, token, login, logout}}>
                    <Layout>
                        <Routes>
                            <Route path='/' element={<Main />} />
                            {isAuthorized ? <Route path='/profile' element={<Profile />} /> : null}
                            <Route path='*' element={<ErrorPage />} />
                        </Routes>
                    </Layout>
                </AuthContext.Provider>
            </BrowserRouter>
        </div>
    );
};

export default App;
