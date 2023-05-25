import React, { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import { useParams } from "react-router-dom";
import RegisterForm from "../components/ui/registerForm";

function Login() {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toogleFormType = () => {
        setFormType((prev) => (prev === "register" ? "login" : "register"));
    };
    return (
        <div className="conteiner mt-5 ">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4">Registration</h3>
                            <RegisterForm />
                            <p className="mt-2">
                                Already have account?{" "}
                                <a
                                    className="text-primary"
                                    role="button"
                                    onClick={toogleFormType}
                                >
                                    Sign In
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Login</h3>
                            <LoginForm />
                            <p className="mt-2">
                                Dont have account?{" "}
                                <a
                                    className="text-primary"
                                    role="button"
                                    onClick={toogleFormType}
                                >
                                    Sign Up
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
