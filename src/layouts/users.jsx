import React from "react";
import { useParams } from "react-router-dom";
import UserInfoPage from "../components/page/userInfoPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    const { id } = useParams();
    return <>{id ? <UserInfoPage id={id} /> : <UsersListPage />}</>;
};
export default Users;
