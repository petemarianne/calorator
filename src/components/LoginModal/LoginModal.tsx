import { Button, CircularProgress, IconButton, InputBase } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, {FormEvent, useContext, useState} from 'react';
import {AuthContext} from "../../contexts/auth-context";

interface LoginModalProps {
    handleClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = (props): JSX.Element => {
    const [fields, setFields] = useState<{
        email: string,
        password: string,
    }>({
        email: '',
        password: ''
    });
    const [validation, setValidation] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const {login} = useContext(AuthContext);


    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, email: event.target.value}));
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, password: event.target.value}));
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        /*fetch('/api/auth/login',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: fields.email,
                    password: fields.password
                }),
                headers: {'Content-Type': 'application/json'}
            })
            .then(response => {
                if (!response.ok) {
                    setValidation(false);
                    setLoading(false);
                } else {
                    response.json().then(data => {
                        login(data.token, data.userID);
                        props.onCloseModal();
                    });
                }
            })*/
        setTimeout(() => {
            login('token', 'userID');
            props.handleClose();
        }, 1300);
    }

    return (
        <div className='login-or-register-modal-wrapper'>
            <div className='close-icon-button-wrapper'>
                <IconButton className='modal-close-button' aria-label='lose' size='medium'
                            onClick={props.handleClose} data-testid='close-button'>
                    <CloseIcon fontSize='medium'/>
                </IconButton>
            </div>
            <form className='login-wrapper' onSubmit={onSubmit}>
                <div className='label'>Email</div>
                <div className='input'>
                    <InputBase value={fields.email} onChange={handleEmail} fullWidth/>
                </div>
                <div className='label'>Password</div>
                <div className='input'>
                    <InputBase id='standard-adornment-password' type='password' value={fields.password} onChange={handlePassword} fullWidth/>
                </div>
                {!validation ? <div className='validation'>Incorrect email or password!</div> : null}
                <div className='button-wrapper'>
                    <Button type='submit' className='button' variant='contained' color='primary'>
                        {!loading ? 'Login' : <CircularProgress color='inherit' size='25px' data-testid='loading'/>}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default LoginModal;