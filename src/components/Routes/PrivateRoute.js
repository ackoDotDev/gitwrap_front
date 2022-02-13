import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import AdminLayout from "../../layouts/Admin.js";

const PrivateRoute = () => {
    const { user, isLoading } = useContext(UserContext);


    if(isLoading) {
        return <div>loading</div>
    }


    if (user) {

        return (
            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        )
    }
    //redirect if there is no user 
    return <Redirect to='/login' />
}

export default PrivateRoute;