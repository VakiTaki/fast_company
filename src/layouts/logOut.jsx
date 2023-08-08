import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../store/users";

function LogOut() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
    }, []);
    return <div>Загрузка...</div>;
}

export default LogOut;
