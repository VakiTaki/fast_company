import React, { useEffect } from "react";
import EditUserForm from "../../ui/editUserForm";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    getQialities,
    getQualitiesLoadingStatus
} from "../../../store/qualitiesSlice";
import {
    getProfessionsLoadingStatus,
    getProfessions
} from "../../../store/professionsSlice";
import { getAuthId, getUserById } from "../../../store/usersSlice";
import UsersLoader from "../../ui/hoc/usersLoader";

function UserEditPage() {
    const history = useHistory();
    const { id } = useParams();
    const authId = useSelector(getAuthId());
    const currentUser = useSelector(getUserById(authId));
    useEffect(() => {
        if (id !== authId) {
            history.push(`/users/${authId}/edit`);
        }
    }, []);
    const profession = useSelector(getProfessions());
    const professionsIsLoading = useSelector(getProfessionsLoadingStatus());
    const qualities = useSelector(getQialities());
    const qualitiesIsLoading = useSelector(getQualitiesLoadingStatus());
    return (
        <UsersLoader>
            <div className="conteiner mt-5 ">
                <div className="row">
                    {!professionsIsLoading && !qualitiesIsLoading && (
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <EditUserForm
                                user={currentUser}
                                professions={profession}
                                qualities={qualities}
                            />
                        </div>
                    )}
                </div>
            </div>
        </UsersLoader>
    );
}

export default UserEditPage;
