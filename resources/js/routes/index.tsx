import React, {useContext} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import SingUp from "./../pages/SingUp";
import SingIn from "./../pages/SingIn";
import Dashboard from "./../pages/Dashboard";
import Profile from "./../pages/Profile";
import {AuthContext} from './../contexts/auth';
import {Customers} from "../pages/Customers";
import {New} from "../pages/New";


interface AuxProps {
    children: JSX.Element;
    redirectTo: string;
    isPrivate: boolean;
}

function RouteMain() {
    return (
        <Routes>
            {newRoute("/", <SingIn/>, '/', false)}
            {newRoute("/signup", <SingIn/>, '/', false)}
            {newRoute("/singup", <SingUp/>, '/', false)}
            {newRoute("/dashboard", <Dashboard/>, '/', true)}
            {newRoute("/profile", <Profile/>, '/', true)}
            {newRoute("/customers", <Customers/>, '/', true)}
            {newRoute("/new", <New/>, '/', true)}
            {newRoute("/new/:id", <New/>, '/', true)}
        </Routes>
    );
}

export default RouteMain;

function newRoute(route: string, Children: JSX.Element, redirectTo: string = "/", isPrivate: boolean = true) {
    return (
        <Route path={route} element={<PrivateRoute redirectTo={redirectTo} isPrivate={isPrivate}>
            {Children}
        </PrivateRoute>}/>
    );
}

function PrivateRoute({children, redirectTo, isPrivate}: AuxProps): JSX.Element {

    const {signed, loading} = useContext(AuthContext);

    if (loading) {
        return (
            <div></div>
        );
    }

    if (!signed && isPrivate) {
        return <Navigate to={'/'}/>
    }

    if (signed && !isPrivate) {
        return <Navigate to={'/dashboard'}/>
    }

    return children;
};
