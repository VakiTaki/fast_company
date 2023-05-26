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
                            <h3 className="mb-4">Регистрация</h3>
                            <RegisterForm onToogleFormType={toogleFormType} />
                            <p className="mt-2">
                                Есть аккаунт?{" "}
                                <a
                                    className="text-primary"
                                    role="button"
                                    onClick={toogleFormType}
                                >
                                    Войти
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Вход</h3>
                            <LoginForm />
                            <p className="mt-2">
                                Нет аккаунта?{" "}
                                <a
                                    className="text-primary"
                                    role="button"
                                    onClick={toogleFormType}
                                >
                                    Зарегестрироваться
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
