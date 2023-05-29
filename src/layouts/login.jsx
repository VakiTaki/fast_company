import React from "react";
import { useParams } from "react-router-dom";
import RegistrationPage from "../components/page/registrationPage";
import LoginPage from "../components/page/loginPage";

function Login() {
    const { type } = useParams();
    return (
        <>{type === "registration" ? <RegistrationPage /> : <LoginPage />}</>
    );
}

export default Login;
