import React, {useContext, useState, useEffect } from 'react';
import { UserContext } from 'contexts/UserContext';
import Cookies from 'js-cookie'

function LoginLogoutLink() {

    const { user, setUser } = useContext(UserContext);

    const [gitLoginUrl, setGitLoginUrl] = useState("");


    useEffect(() => {
        async function findUser() {
            await fetch('/api/auth/github', { headers: new Headers({ accept: 'application/json' }) })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong!');
            })
            .then((data) => setGitLoginUrl(data.url))
            .catch((error) => console.error(error));
        }
        findUser();
    }, []);

    const logOutUser = (e) => {

        e.preventDefault();


        fetch('/api/auth/logout', { headers: new Headers({ 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('user_token')    
        }) })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong!');
        })
        .then((data) => {
            Cookies.remove('user_token');

            setUser(null)
        })
        .catch((error) => console.error(error));
        
    }

    if(!user){
        return (
            <a href={gitLoginUrl} className="nav-link btn-rotate">
                <i className="fab fa-github"></i>     
                <p>   
                    <span className=" d-md-block">Log In</span>
                </p>
            </a>
        )
    }

    return (
        <a onClick={ logOutUser } className="nav-link btn-rotate">
            <span className=" d-md-block">Log Out</span>
        </a>
    )
}

export default LoginLogoutLink;