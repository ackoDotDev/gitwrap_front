import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import {  useHistory } from "react-router-dom";

export default function FindUser() {
    const history = useHistory();

    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    
        useEffect(() => {
        async function findUser() {
            const cookies = new Cookies();
            if(cookies.get('user_token')){
                const requestOptions = {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + cookies.get('user_token')    
                    },
                };
                await fetch('/api/auth/user', requestOptions)
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Something went wrong!');
                    })
                    .then((data) => {
                        setUser(data.user); 
                        setLoading(false);

                    }).catch(err => {
                        setLoading(false);

                    });
            } else {
                setLoading(false);
            }
        
        }
        findUser();
    }, []);
    

    return {
        user,
        setUser,
        isLoading,
        setLoading
    }
}