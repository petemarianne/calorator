import React from 'react';
import './ErrorPage.scss';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

export const ErrorPage: React.FC = (): JSX.Element => {
    return (
        <>
            <div className='logo404-wrapper'>
                <div className='four'>4</div>
                <div className='logo'><img src={logo} alt='logo'/></div>
                <div className='four'>4</div>
            </div>
            <div className='message-wrapper'>
                <div>Oops, this page was not found!</div>
                <div>Either something went wrong or the page doesn't exist anymore.</div>
            </div>
            <div className='button-wrapper'>
                <Button color='primary' variant='contained' component={Link} to='/' className='go-home-button'>Go Home</Button>
            </div>
        </>
    )
}
