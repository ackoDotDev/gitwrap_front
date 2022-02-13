import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';


export default function Auth() {
    let history = useHistory();
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);

    const setUserContext = async () => {

        return await axios.get('/api/auth/user'
        ).then(res => {

            if (res?.data?.user) {
                setUser(res.data.user);
                history.push('/');
            }
            else {
                console.log('no user');
            }
        }).catch((err) => {
            setError(err.data);
        })
    }

    const loginUser = async () => {
        const { email, password } = data;

        return axios.post(`/api/auth/login`, {
            email, password
        }).then(async () => {
            await setUserContext();
        }).catch((err) => {
            setError(err.data);
        })
    };

    const logoutUser = async () => {
        axios.get(`/api/auth/logout`).then(() => {
            setUser(null);
        }).catch((err) => {
            setError(err.data);
        });
    }

    return {
        loginUser,
        logoutUser,
        error
    }
}