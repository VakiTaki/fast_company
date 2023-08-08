import React from "react";
import { useParams } from "react-router-dom";
import UserInfoPage from "../components/page/userInfoPage";
import UsersListPage from "../components/page/usersListPage";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
    const { id } = useParams();
    return (
        <>
            <UsersLoader>
                {id ? <UserInfoPage id={id} /> : <UsersListPage />}
            </UsersLoader>
        </>
    );
};
export default Users;
