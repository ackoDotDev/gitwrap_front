
import React, { useContext, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';
import Cookies from 'universal-cookie';


function Auth() {
    let history = useHistory();
    const location = useLocation();

    const { setUser, setLoading } = useContext(UserContext);


    useEffect(() => {
        async function findUser() {
            await fetch('/api/auth/github/callback' + location.search, { headers: new Headers({ accept: 'application/json' }) })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong!');
            })
            .then((data) => {
                setUser(data.user)
                setLoading(false)
                const cookies = new Cookies();
                cookies.set('user_token', data.token, { path: '/' });
                history.push('/admin/dashboard');
            })
            .catch((error) => console.error(error));
        }
        findUser();
    }, []);

    return (
        <div>Loading...</div>
    );
}

export default Auth;
