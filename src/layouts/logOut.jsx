import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

function LogOut() {
    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
    }, []);
    return <div>Загрузка...</div>;
}

export default LogOut;
