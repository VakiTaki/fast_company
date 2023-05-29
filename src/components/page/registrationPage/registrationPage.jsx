import React from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "../../ui/registerForm";

function RegistrationPage() {
    const history = useHistory();
    const handleToLogin = () => {
        history.replace(`/login`);
    };
    return (
        <div className="conteiner mt-5 ">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Регистрация</h3>
                    <RegisterForm />
                    <p className="mt-2">
                        Есть аккаунт?{" "}
                        <a
                            className="text-primary"
                            role="button"
                            onClick={handleToLogin}
                        >
                            Войти
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;
