import React, { useState } from 'react';
import './Header.scss';
import { AppBar, Button, Toolbar, useMediaQuery } from '@material-ui/core';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';

const Header: React.FC = (): JSX.Element => {
    const [sellerID, setSellerID] = useState<boolean>(true)

    const desktop = useMediaQuery('(min-width: 620px)');

    return (
        <AppBar color='inherit' position='static' className='header-wrapper' elevation={0}>
            <Toolbar className='toolbar'>
                        <Link className='toolbar-left-side desktop' to='/' style={{ textDecoration: 'none' }}>
                            {desktop && (
                                <>
                                    <div>C</div>
                                    <div className='logo'><img src={logo} alt='logo'/></div>
                                    <div>LORATOR</div>
                                </>
                                )
                            }
                            {!desktop && (
                                <div className='logo'><img src={logo} alt='logo'/></div>
                                )
                            }
                        </Link>
                        <div className='toolbar-right-side desktop'>
                            {sellerID ?
                                <>
                                    <div className='submit-an-ad-button-wrapper'>
                                        <Button color='primary' variant='outlined' className='submit-an-ad-button'>My profile</Button>
                                    </div>
                                    <div className='submit-an-ad-button-wrapper'>
                                        <Button color='primary' variant='contained' className='submit-an-ad-button'>sign out</Button>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='submit-an-ad-button-wrapper'>
                                        <Button color='primary' variant='outlined' className='submit-an-ad-button'>Sign In</Button>
                                    </div>
                                    <div className='submit-an-ad-button-wrapper'>
                                        <Button color='primary' variant='contained' className='submit-an-ad-button'>Sign Up</Button>
                                    </div>
                                </>
                            }
                        </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
