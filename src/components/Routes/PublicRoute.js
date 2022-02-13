import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';

const PublicRoute = (props) => {
    const { user, isLoading } = useContext(UserContext);

    const { component: Component, ...rest } = props;

    if(isLoading) {
        return <div>loading</div>
    }

    if (!user) {

        return (
            <Route {...rest} render={
                (props) => (<Component {...props} />)
            }
            />
        )
    }
    //redirect if user is loged in 
    return <Redirect to='/admin/dashboard' />
}


export default PublicRoute
