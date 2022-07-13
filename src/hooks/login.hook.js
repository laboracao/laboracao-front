import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {API, setUserDataInStorage} from '../services/api';

const LoginHook = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {email}

        API.post('/login', data).then((response) => {
            const {_id, email, term_accept} = response.data;
            setUserDataInStorage({_id, email, term_accept});
            history.push('/dashboard');
        }).catch((e) => {
            console.log(e);
        })
    }

    return {
        email,
        setEmail,
        handleSubmit
    }
};

export default LoginHook;
