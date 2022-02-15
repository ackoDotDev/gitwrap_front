import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import {  useHistory } from "react-router-dom";


export default function FindUser() {
    const history = useHistory();

    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    
    useEffect(async () => {
        
        async function findUser() {
            
            const requestOptions = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('user_token')    
                },
            };

            await fetch('/api/users', requestOptions)
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
                    console.log(err)
                    setLoading(false);
                    Cookies.remove('user_token');
            });
        
        }
        
        if(Cookies.get('user_token')){
            console.log("has token")
            await findUser();
        } else {
            setLoading(false);
        }
    }, []);
    

    return {
        user,
        setUser,
        isLoading,
        setLoading
    }
}