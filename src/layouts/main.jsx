import React from "react";
import useMockData from "../utils/mockData";
import { getEmail } from "../service/localStorage.service";

function Main() {
    const currentUser = getEmail();
    const { error, initialize, progress, status } = useMockData();
    const handleInitialisation = () => {
        initialize();
    };
    return (
        <div className="container mt-5">
            <h1>Main page</h1>
            {currentUser && <h2>Сейчас в системе: {currentUser}</h2>}
            <h3>Инициализация данных в FireBase</h3>
            <ul>
                <li>Статус: {status}</li>
                <li>Прогресс: {progress}%</li>
                {error && <li>Ошибка</li>}
            </ul>
            <button
                className="btn btn-primary"
                onClick={handleInitialisation}
                disabled={progress !== 0 && !(progress === 100)}
            >
                {"Инициализация"}
            </button>
        </div>
    );
}

export default Main;
