import { Button, CircularProgress, IconButton, InputBase } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, {FormEvent, useContext, useState} from 'react';
import PicSelect from '../PicUpload/PicSelect';
import { AuthContext } from '../../contexts/auth-context';
import { app } from '../../firebase';

interface LoginModalProps {
    handleClose: () => void
}

enum AllFieldsValidation {
    InitialState,
    NotAllFieldsFilled,
    AllFieldsFilled,
}

const RegisterModal: React.FC<LoginModalProps> = (props): JSX.Element => {
    const [fields, setFields] = useState<{
        email: string,
        password: string,
        repeatedPassword: string,
        name: string,
    }>({
        email: '',
        password: '',
        repeatedPassword: '',
        name: '',
    });
    const [file, setFile] = useState<File>();
    const [loading, setLoading] = useState<boolean>(false);
    const [validation, setValidation] = useState<{
        email: boolean,
        password: boolean,
        repeatedPassword: boolean,
        allFields: AllFieldsValidation,
        usedEmail: boolean,
    }>({
        email: true,
        password: true,
        repeatedPassword: true,
        allFields: AllFieldsValidation.InitialState,
        usedEmail: true,
    });

    const {login} = useContext(AuthContext);

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, email: event.target.value}));
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, password: event.target.value}));
    };

    const handleRepeatedPassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, repeatedPassword: event.target.value}));
    };

    const handleName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFields(current => ({...current, name: event.target.value}));
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        let flag = false;
        if (validation.allFields !== AllFieldsValidation.AllFieldsFilled) {
            for (let key in fields) {
                // @ts-ignore
                if (fields[key] === '' || !file) {
                    setValidation(prevState => ({...prevState, allFields: AllFieldsValidation.NotAllFieldsFilled}));
                    flag = false;
                    break;
                }
                setValidation(prevState => ({...prevState, allFields: AllFieldsValidation.AllFieldsFilled}));
                flag = true;
            }
        }
        if (validation.allFields === AllFieldsValidation.AllFieldsFilled || flag) {
            flag = false;
            const mailFormat = /^([a-zA-Z0-9._]+)@([a-zA-Z0-9._]+)\.([a-z]{2,3})$/;
            if (!mailFormat.test(fields.email) && fields.email !== '') {
                setValidation(prevState => ({...prevState, email: false}));
                flag = false;
            } else {
                setValidation(prevState => ({...prevState, email: true}));
                flag = true;
            }
            if (fields.password.length < 6) {
                setValidation(prevState => ({...prevState, password: false}));
                flag = false;
            } else {
                setValidation(prevState => ({...prevState, password: true}));
                flag = true;
                if (fields.password !== fields.repeatedPassword) {
                    setValidation(prevState => ({...prevState, repeatedPassword: false}));
                    flag = false;
                } else {
                    setValidation(prevState => ({...prevState, repeatedPassword: true}));
                    flag = true;
                }
            }
            const storageRef = app.storage().ref();
            if (flag && file) {
                const fileRef = storageRef.child(file.name);
                await fileRef.put(file);
                const fileUrl: string = await fileRef.getDownloadURL();
                /*const registerResponse = await fetch('/api/auth/register',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            email: fields.email,
                            password: fields.password,
                            name: fields.name,
                            avatar: fileUrl
                        }),
                        headers: {'Content-Type': 'application/json'}
                    });
                const registerData = await registerResponse.json();
                if (registerResponse.ok) {
                    login(registerData.token, registerData.userID);
                    props.handleClose();
                } else {
                    if (registerData.message === 'This email is already used!') {
                        setValidation(prevState => ({...prevState, usedEmail: false}));
                    }
                }*/
            }
        }
        login('token', 'userID');
    };

    return (
        <div className='login-or-register-modal-wrapper'>
            <div className='close-icon-button-wrapper'>
                <IconButton className='modal-close-button' aria-label='lose' size='medium'
                            onClick={props.handleClose} data-testid='close-button'>
                    <CloseIcon fontSize='medium'/>
                </IconButton>
            </div>
            <form className='login-wrapper' onSubmit={(e) => {
                setLoading(true);
                onSubmit(e).then(() => {setLoading(false); props.handleClose();});
            }}>
                <div className='label'>Email</div>
                <div className={!validation.email ? 'input validate' : 'input'}>
                    <InputBase value={fields.email} onChange={handleEmail} fullWidth/>
                </div>
                {!validation.email ? <div className='validation-registration'>Incorrect email!</div> : null}
                {!validation.usedEmail ? <div className='validation-registration'>This email is already used!</div> : null}
                <div className='label'>Password</div>
                <div className={!validation.password || !validation.repeatedPassword ? 'input validate' : 'input'}>
                    <InputBase type='password' value={fields.password} onChange={handlePassword} fullWidth/>
                </div>
                {!validation.password ? <div className='validation-registration'>The password must contain at least 6 characters!</div> : null}
                <div className='label'>Repeat password</div>
                <div className={!validation.repeatedPassword ? 'input validate' : 'input'}>
                    <InputBase type='password' value={fields.repeatedPassword} onChange={handleRepeatedPassword} fullWidth/>
                </div>
                {!validation.repeatedPassword ? <div className='validation-registration'>Password don't match!</div> : null}
                <div className='label'>Name</div>
                <div className='input'>
                    <InputBase value={fields.name} onChange={handleName} fullWidth/>
                </div>
                <PicSelect file={file} onFileSelect={setFile} />
                {validation.allFields === AllFieldsValidation.NotAllFieldsFilled ? <div className='validation-registration'>Fill in all the fields!</div> : null}
                <div className='button-wrapper'>
                    <Button type='submit' className='button' variant='contained' color='primary'>
                        {!loading ? 'Register' : <CircularProgress color='inherit' size='25px' data-testid='loading'/>}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default RegisterModal;