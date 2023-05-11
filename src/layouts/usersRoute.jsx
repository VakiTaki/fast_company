import React from "react";
import Users from "../components/userList/users";
import UserInfo from "../components/userList/userInfo";
import { useParams } from "react-router-dom";

function UsersRoute() {
    const { id } = useParams();
    return <>{id ? <UserInfo id={id} /> : <Users />}</>;
}

export default UsersRoute;
