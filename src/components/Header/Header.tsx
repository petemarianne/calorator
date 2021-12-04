import React, { useContext, useState } from 'react';
import './Header.scss';
import { AppBar, Button, Modal, Toolbar, useMediaQuery } from '@material-ui/core';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import { AuthContext } from '../../contexts/auth-context';

const Header: React.FC = (): JSX.Element => {
    const [openLogin, setOpenLogin] = useState<boolean>(false)
    const [openRegister, setOpenRegister] = useState<boolean>(false)

    const {userID, logout} = useContext(AuthContext);


    const desktop = useMediaQuery('(min-width: 620px)');

    return (
        <>
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
                                {userID ?
                                    <>
                                        <div className='submit-an-ad-button-wrapper'>
                                            <Button color='primary' variant='outlined' className='submit-an-ad-button' component={Link} to='/profile'>My profile</Button>
                                        </div>
                                        <div className='submit-an-ad-button-wrapper'>
                                            <Button color='primary' variant='contained' className='submit-an-ad-button' onClick={logout}>sign out</Button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='submit-an-ad-button-wrapper'>
                                            <Button color='primary' variant='outlined' className='submit-an-ad-button' onClick={() => setOpenLogin(true)}>Sign In</Button>
                                        </div>
                                        <div className='submit-an-ad-button-wrapper'>
                                            <Button color='primary' variant='contained' className='submit-an-ad-button' onClick={() => setOpenRegister(true)}>Sign Up</Button>
                                        </div>
                                    </>
                                }
                            </div>
                </Toolbar>
            </AppBar>
            <Modal
                open={openLogin}
                onClose={() => setOpenLogin(false)}
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                className='modal'>
                <div className='modal-content'>
                    <LoginModal handleClose={() => setOpenLogin(false)}/>
                </div>
            </Modal>
            <Modal
                open={openRegister}
                onClose={() => setOpenRegister(false)}
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
                className='modal'>
                <div className='modal-content'>
                    <RegisterModal handleClose={() => setOpenRegister(false)}/>
                </div>
            </Modal>
        </>
    );
};

export default Header;
