import { useState } from "react";
import Cookies from 'universal-cookie';

export default function UserHandler() {
    const [error, setError] = useState(null);

    const updateProfile = async (data) => {
        const cookies = new Cookies();

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + cookies.get('user_token')    
            },
            body: JSON.stringify({ name: data.name, company: data.company })
        };

        const response = await fetch('/api/users', requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong!');
            })
        if (response && response.updated) {
            return response;
        } else {
            console.log(response.error);
        }
    };

    return {
        updateProfile,
    };
}
