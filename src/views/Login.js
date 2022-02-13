
import React, { useState, useEffect } from "react";


function Login() {

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

    return (
        <>
            <a className="App-link" href={gitLoginUrl}>
                Sign in with Google
            </a>
        </>
    );
}

export default Login;
