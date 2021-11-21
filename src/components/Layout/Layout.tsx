import React from 'react';
import './Layout.scss';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout: React.FC = ({ children }): JSX.Element => {

    return (
        <>
            <Header />
                <main id='main'>
                    {children}
                </main>
            <Footer />
        </>
      );
};

export default Layout;
