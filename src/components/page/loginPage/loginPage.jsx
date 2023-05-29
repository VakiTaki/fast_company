import React from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "../../ui/loginForm";

function LoginPage() {
    const history = useHistory();
    const handleToRegistration = () => {
        history.replace(`/login/registration`);
    };
    return (
        <div className="conteiner mt-5 ">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Вход</h3>
                    <LoginForm />
                    <p className="mt-2">
                        Нет аккаунта?{" "}
                        <a
                            className="text-primary"
                            role="button"
                            onClick={handleToRegistration}
                        >
                            Зарегестрироваться
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
