
import React, { useContext, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';
import Cookies from 'universal-cookie';
import FingerprintJS from '@fingerprintjs/fingerprintjs'


function Auth() {
    let history = useHistory();
    const location = useLocation();

    const { setUser, setLoading } = useContext(UserContext);

    const fpPromise = FingerprintJS.load();



    useEffect(() => {
        async function findUser() {
            const fp = await fpPromise
            const result = await fp.get()
            await fetch(`/api/auth/github/callback${location.search}&browser_id=${result.visitorId}`, { headers: new Headers({ accept: 'application/json' }) })
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
