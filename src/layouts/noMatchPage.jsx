import React from "react";
import { useLocation } from "react-router-dom";

function NoMatchPage() {
    const location = useLocation();
    return (
        <div>
            <h3>
                Страницы <code>{location.pathname}</code> не существует
            </h3>
        </div>
    );
}

export default NoMatchPage;
